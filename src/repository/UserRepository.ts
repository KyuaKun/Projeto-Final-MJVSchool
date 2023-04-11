import { User } from "../schema/UserScheema";
import { InsertUserProps } from "../types/User/InsertUser";
import { UpdateUserProps } from "../types/User/UpdateUser";

class UserRepository {
  store(user: InsertUserProps) {
    return User.create(user);
  }

  update(id: string, user: UpdateUserProps) {
    return User.findByIdAndUpdate({ _id: id }, { $set: user });
  }

  index() {
    return User.find();
  }

  showById(id: string) {
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

  showByName(username: string) {
    return User.findOne(
      { username: username },
      "-_id -active -createdAt -updatedAt -ip -rp -password -role -id -email"
    );
  }

  showByEmail(email: string) {
    return User.findOne({ email: email });
  }

  destroy(id: string) {
    return User.findByIdAndDelete({ _id: id });
  }
}

export default new UserRepository();
