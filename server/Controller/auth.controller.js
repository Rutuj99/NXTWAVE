import User from "../Model/User.model.js";
import bcrypt from "bcrypt";

export async function RegisterControll(data) {
  let emailFind = await User.findOne({ email: data.email });

  if (emailFind) {
    throw new Error("User with Email Address is alredy registered");
  }

  try {
    bcrypt.hash(data.password, 5, async function (err, hash) {
      if (err) {
        throw new Error("Something went wrong please try again");
      }

      let value = await User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        company: data.company,
        dob:data.dob,
        profileImage:data.profileImage,
        password: hash
      });
    });
  } catch (err) {
    throw new Error(err.message);
  }

  return "Registration Successfull";
}

export async function LoginControll(data) {
  const value = await User.findOne({
    email: data.email,
  });

  if (!value) {
    throw new Error("Email not found.");
  }

  const result = await bcrypt.compare(data.password, value.password);

  if (result) {
    return { message: "Login Successfull"};
  } else {
    throw new Error("Invalid password.");
  }
}
