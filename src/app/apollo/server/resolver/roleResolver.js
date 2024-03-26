import { Role } from "../../../lib/models/roleModal";

const addRole = async (_, args) => {
  try {
    const newRole = await Role.create({ roleName: args.roleName });
    // console.log("🚀 ~ addCategory ~ newCategory:", newCategory);

    if (!newRole) return new Error("Role not created");
    return newRole;
  } catch (error) {
    console.log("🚀 ~ addRole ~ error:", error);
  }
};

const roleResolver = {
  Mutation: {
    addRole,
  },
};

export default roleResolver;
