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
      "-_id -active -createdAt -updatedAt -role"
    );
  }

  showByName(username: string) {
    return User.findOne(
      { username: username },
      "-_id -active -createdAt -updatedAt -ip -rp -password -role -id -email"
    );
  }

  destroy(id: string) {
    return User.findByIdAndDelete({ _id: id });
  }
}

export default new UserRepository();
