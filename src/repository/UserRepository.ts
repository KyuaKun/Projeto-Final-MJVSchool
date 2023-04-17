import { User } from "../schema/UserScheema";
import { InsertUserProps } from "../types/User/InsertUser";
import { UpdateUserProps } from "../types/User/UpdateUser";

class UserRepository {
  createUser(user: InsertUserProps) {
    return User.create(user);
  }

  findByIdAndUpdate(id: string, user: UpdateUserProps) {
    return User.findByIdAndUpdate({ _id: id }, { $set: user });
  }

  listAllUsers() {
    return User.find();
  }

  findUserById(id: string) {
    return User.findById(
      { _id: id },
      "-_id -active -createdAt -updatedAt -role -password -email"
    );
  }

  showUserDoc(username: string) {
    return User.findOne({ username: username });
  } // sem uso

  verifyUserDoc(username: string, email: string) {
    return User.findOne({ username: username, email: email });
  } // sem uso

  findUserByUsername(username: string) {
    return User.findOne(
      { username: username },
      "-_id -active -createdAt -updatedAt -ip -rp -password -role -id -email"
    );
  }

  findUserByEmail(email: string) {
    return User.findOne({ email: email });
  }

  deleteUserById(id: string) {
    return User.findByIdAndDelete({ _id: id });
  }
}

export default new UserRepository();
