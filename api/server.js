require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createClient } = require("@supabase/supabase-js");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://shop-app-rosy-phi.vercel.app"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const isProduction = process.env.NODE_ENV === "production";

app.get("/", (req, res) => {
  res.send("API a funcionar com sucesso!");
});

app.get("/products", async (req, res) => {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  return res.json(data);
});

app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res
      .status(400)
      .json({ message: "Email, username e password obrigatorios" });
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });

  if (authError) {
    return res.status(400).json({ message: authError.message });
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .insert([
      { id: authData.user.id, username: username, email: email, role: "user" },
    ]);

  if (profileError) {
    return res.status(400).json({ message: profileError.message });
  }

  if (authData.session) {
    res.cookie("access_token", authData.session.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 86400000,
    });
  }

  res.json({ user: profileData, session: authData.session });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError) {
    return res.status(401).json({ message: "Credenciais invalidas" });
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authData.user.id)
    .single();

  if (profileError) {
    return res
      .status(400)
      .json({ message: "Erro ao carregar dados do perfil" });
  }

  console.log("Access Token:", authData.session.access_token);

  res.cookie("access_token", authData.session.access_token, {
    httpOnly: true, // Esconde o cookie do JavaScript (Super seguro!)
    secure: true, // Em desenvolvimento local deve ser false. Na internet usa true (HTTPS)
    sameSite: isProduction ? "none" : "lax", // Protege contra vulnerabilidades CSRF
    maxAge: 86400000,
  });

  res.json({ user: profileData, session: authData.session });
});

app.patch("/me/update-password", async (req, res) => {
  const { userPassword, newPassword } = req.body;
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Sessão não encontrada" });
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    res.clearCookie("access_token");
    return res.status(401).json({ message: "Sessão expirada" });
  }
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: userPassword,
  });

  if (signInError) {
    return res
      .status(400)
      .json({ message: "A password atual está incorreta." });
  }

  const { data, error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    return res.status(400).json({ message: "Erro ao atualizar password" });
  }

  return res.json({ message: "Password atualizada com sucesso", data });
});

app.get("/me", async (req, res) => {
  if (!req.user) {
    return res.status(200).json({ user: null });
  }

  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Sessão não encontrada" });
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    res.clearCookie("access_token");
    return res.status(401).json({ message: "Sessão expirada" });
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    return res
      .status(400)
      .json({ message: "Erro ao carregar dados do perfil" });
  }

  return res.json({ user: profileData });
});

app.get("/cart", async (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Sessão não encontrada" });
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ message: "Sessão inválida" });
  }

  const { data, error } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id)
    .order("product_id", { ascending: true });

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  return res.json(data);
});

app.post("/cart", async (req, res) => {
  const { product } = req.body;
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "Sessão não encontrada" });
  }

  // Identifica o utilizador através do token do Supabase
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ message: "Sessão inválida" });
  }

  const {
    product_id,
    product_name,
    product_image,
    product_priceCents,
    quantity = 1,
  } = product;

  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("user_id", user.id)
    .eq("product_id", product_id)
    .maybeSingle();

  const newQuantity = existingItem
    ? existingItem.quantity + quantity
    : quantity;

  const { data, error } = await supabase
    .from("cart_items")
    .upsert(
      {
        user_id: user.id,
        product_id: product_id,
        quantity: newQuantity,
        product_image: product_image,
        product_name: product_name,
        product_priceCents: product_priceCents,
      },
      { onConflict: "user_id,product_id" },
    )
    .select();

  if (error) {
    // Apresenta a mensagem exata do erro do Supabase no terminal para facilitar o debug
    return res.status(400).json({ message: error.message });
  }

  return res.json(data);
});

app.get("/favorites", async (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Sessão não encontrada" });
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ message: "Sessão inválida" });
  }

  const { data, error } = await supabase
    .from("favorites")
    .select(
      `user_id, product_id, products (
        name,
        image,
        price_cents
      )`,
    )
    .eq("user_id", user.id);

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const formattedData = data.map((fav) => ({
    user_id: fav.user_id,
    product_id: fav.product_id,
    product_name: fav.products?.name,
    product_image: fav.products?.image,
    product_priceCents: fav.products?.price_cents,
  }));

  return res.json(formattedData);
});

app.post("/favorites", async (req, res) => {
  const { product_id } = req.body;

  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "Sessão não encontrada" });
  }

  // Identifica o utilizador através do token do Supabase
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ message: "Sessão inválida" });
  }

  const { data: existingFavorite } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", product_id)
    .maybeSingle();

  if (existingFavorite) {
    const { error: deleteError } = await supabase
      .from("favorites")
      .delete()
      .eq("id", existingFavorite.id);

    if (deleteError) {
      return res.status(400).json({ message: deleteError.message });
    }
    return res.json({ message: "Removido dos favoritos" });
  }

  const { data, error } = await supabase
    .from("favorites")
    .insert({
      user_id: user.id,
      product_id: product_id,
    })
    .select();

  if (error) {
    // Apresenta a mensagem exata do erro do Supabase no terminal para facilitar o debug
    return res.status(400).json({ message: error.message });
  }

  return res.json({ message: "Adicionado aos favoritos", data });
});

app.delete("/favorites/:product_id", async (req, res) => {
  const { product_id } = req.params;

  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "Sessão não encontrada" });
  }

  // Identifica o utilizador através do token do Supabase
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ message: "Sessão inválida" });
  }

  const { data, error: deleteError } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", product_id);

  if (deleteError) {
    return res.status(400).json({ message: deleteError.message });
  }

  return res.json({ message: "Favorito eliminada com sucesso", data });
});

app.get("/address", async (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Sessão não encontrada" });
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ message: "Sessão inválida" });
  }

  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  return res.json(data);
});

app.post("/address", async (req, res) => {
  const { street, postal_code, city, phone } = req.body;
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Sessão não encontrada" });
  }

  // Identifica o utilizador através do token do Supabase
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ message: "Sessão inválida" });
  }

  const { data, error } = await supabase
    .from("addresses")
    .insert({
      user_id: user.id,
      street: street,
      postal_code: postal_code,
      city: city,
      phone: phone,
    })
    .select();

  if (error) {
    // Apresenta a mensagem exata do erro do Supabase no terminal para facilitar o debug
    return res.status(400).json({ message: error.message });
  }

  return res.json(data);
});

app.get("/order", async (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Sessão não encontrada" });
  }

  // Identifica o utilizador através do token do Supabase
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ message: "Sessão inválida" });
  }

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      total_cents,
      created_at,
      order_items (
        id,
        product_id,
        product_name,
        product_image,
        product_priceCents,
        quantity
      )
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  return res.json(data);
});

app.post("/order", async (req, res) => {
  const { order } = req.body;
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Sessão não encontrada" });
  }

  // Identifica o utilizador através do token do Supabase
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ message: "Sessão inválida" });
  }

  const totalCents = order.reduce(
    (acc, item) =>
      acc +
      (item.product_priceCents || item.product_price_cents) * item.quantity,
    0,
  );

  const { data: newOrder, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      total_cents: totalCents,
    })
    .select()
    .single();

  if (orderError) {
    return res.status(400).json({ message: orderError.message });
  }

  const orderItemsPayload = order.map((order) => ({
    order_id: newOrder.id,
    product_id: order.product_id,
    product_name: order.product_name,
    product_priceCents: order.product_priceCents,
    quantity: order.quantity,
    product_image: order.product_image,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItemsPayload);

  if (itemsError) {
    return res.status(400).json({ message: itemsError.message });
  }

  await supabase.from("cart_items").delete().eq("user_id", user.id);

  return res.status(201).json(newOrder);
});

app.delete("/address/:address_id", async (req, res) => {
  const { address_id } = req.params;

  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "Sessão não encontrada" });
  }

  // Identifica o utilizador através do token do Supabase
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ message: "Sessão inválida" });
  }

  const { data, error: deleteError } = await supabase
    .from("addresses")
    .delete()
    .eq("user_id", user.id)
    .eq("id", address_id);

  if (deleteError) {
    return res.status(400).json({ message: deleteError.message });
  }

  return res.json({ message: "Morada eliminada com sucesso", data });
});

app.patch("/cart/removeItem/:product_id", async (req, res) => {
  const { product_id } = req.params;

  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "Sessão não encontrada" });
  }

  // Identifica o utilizador através do token do Supabase
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ message: "Sessão inválida" });
  }

  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("user_id", user.id)
    .eq("product_id", product_id)
    .maybeSingle();

  const newQuantity = existingItem.quantity - 1;

  if (newQuantity <= 0) {
    const { error: deleteError } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", product_id);

    if (deleteError) {
      return res.status(400).json({ message: deleteError.message });
    }
    return res.json({ message: "Item removido com sucesso" });
  }

  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity: newQuantity })
    .eq("user_id", user.id)
    .eq("product_id", product_id)
    .select();

  if (error) {
    // Apresenta a mensagem exata do erro do Supabase no terminal para facilitar o debug
    return res.status(400).json({ message: error.message });
  }

  return res.json(data);
});

app.patch("/cart/addItem/:product_id", async (req, res) => {
  const { product_id } = req.params;

  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "Sessão não encontrada" });
  }

  // Identifica o utilizador através do token do Supabase
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ message: "Sessão inválida" });
  }

  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("user_id", user.id)
    .eq("product_id", product_id)
    .maybeSingle();

  const newQuantity = existingItem.quantity + 1;

  const { data, error } = await supabase
    .from("cart_items")
    .upsert(
      {
        user_id: user.id,
        product_id: product_id,
        quantity: newQuantity,
      },
      { onConflict: "user_id,product_id" },
    )
    .select();

  if (error) {
    // Apresenta a mensagem exata do erro do Supabase no terminal para facilitar o debug
    return res.status(400).json({ message: error.message });
  }

  return res.json(data);
});

app.delete("/cart/:product_id", async (req, res) => {
  const { product_id } = req.params;
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "Sessão não encontrada" });
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ message: "Sessão inválida" });
  }

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", product_id);

  if (error) {
    // Apresenta a mensagem exata do erro do Supabase no terminal para facilitar o debug
    return res.status(400).json({ message: error.message });
  }

  return res.json({ message: "Item removido do carrinho" });
});

app.post("/logout", (req, res) => {
  res.clearCookie("access_token", {
    secure: true,
    sameSite: isProduction ? "none" : "lax",
  });
  return res.json({ message: "Sessao encerrada com sucesso" });
});

app.listen(PORT, () => {
  console.log("Servidor a rodar na porta 3000");
});
