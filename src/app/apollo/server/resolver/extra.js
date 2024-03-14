const getUsersByAdmin = combineResolvers(
    isAuthenticatedAdmin,
    async (_, { input }, { user }) => {
      try {
        const { page, limit, column, order, search } = input;
        let query = { role: "user" };
        let regexSearch = search ? new RegExp(search, "i") : "";
        // console.log("🚀 ~ regexSearch:", regexSearch);
  
        if (search) {
          query = {
            role: "user",
            $or: [
              { firstName: { $regex: regexSearch } },
              { lastName: { $regex: regexSearch } },
              { email: { $regex: regexSearch } },
              { gender: { $regex: regexSearch } },
              { hobby: { $regex: regexSearch } },
            ],
          };
        }
  
        const options = {
          page: page || 1,
          limit: limit || 5,
          sort: { [column]: order === "asc" ? 1 : -1 },
        };
  
        const allUserData = await User.paginate(query, options);
  
        if (!search && !allUserData.docs.length) {
          console.log("No matching users found");
          return new Error("No matching users found please search again");
        }
  
        return allUserData;
        // return {
  
        //   docs: allUserData.docs,
        //   totalDocs: allUserData.totalDocs,
        //   limit: allUserData.limit,
        //   totalPages: allUserData.totalPages,
        //   page: allUserData.page,
        //   nextPage: allUserData.nextPage,
        //   prevPage: allUserData.prevPage,
        // };
      } catch (err) {
        return new Error(err.message);
      }
    }
  );