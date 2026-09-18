require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createClient } = require("@supabase/supabase-js");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://shop-app-rosy-phi.vercel.app/"],
    credentials: true,
  }),
);
app.use(cookieParser());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/", (req, res) => {
  res.send("API a funcionar com sucesso!");
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

  const { error: profileError } = await supabase
    .from("profiles")
    .insert([{ id: authData.user.id, username: username, email: email }]);

  if (profileError) {
    return res.status(400).json({ message: profileError.message });
  }

  res.json({ user: authData.user });
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
    secure: false, // Em desenvolvimento local deve ser false. Na internet usa true (HTTPS)
    sameSite: "lax", // Protege contra vulnerabilidades CSRF
    maxAge: 86400000,
  });

  res.json({ user: profileData, session: authData.session });
});

app.get("/me", async (req, res) => {
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
  const {
    product_image,
    product_name,
    product_priceCents,
    product_id,
    quantity,
  } = req.body;
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
  res.clearCookie("access_token");
  return res.json({ message: "Sessao encerrada com sucesso" });
});

app.listen(PORT, () => {
  console.log("Servidor a rodar na porta 3000");
});
