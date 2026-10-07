export type TAddress = {
  id: string;
  street: string;
  postal_code: string;
  city: string;
  phone: string;
};

export type TAddressContext = {
  address: TAddress[];
  street: string;
  postal_code: string;
  city: string;
  phone: string;
  handleStreetChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePostalCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  DeleteAddress: (id: string) => void;
};
