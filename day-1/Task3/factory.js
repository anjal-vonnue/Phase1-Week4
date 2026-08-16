function createUser({ name, email, role = "viewer", createdAt = Date.now() }) {
  if (!name) {
    throw new Error("name is required");
  }

  if (!email) {
    throw new Error("email is required");
  }

  const user = {
    id: crypto.randomUUID(),
    name: name,
    email: email,
    role: role,
    createdAt: createdAt,
  };

  const freezedUser = Object.freeze(user);

  return freezedUser;
}

let user = createUser({ name: "Kroos", email: "kroos@gmail.com" });
console.log("createdUser: ", user);

//link: https://www.geeksforgeeks.org/javascript/method-chaining-in-javascript/

class QueryBuilder {
  constructor() {
    this.table = "";
    this.condition = "";
    this.fields = "";
    this.n = null;
  }
  from(table) {
    this.table = table;
    return this;
  }

  where(condition) {
    this.condition = condition;
    return this;
  }

  select(fields) {
    this.fields = fields.join(", ");
    return this;
  }

  limit(n) {
    this.n = n;
    return this;
  }

  build() {
    let query = `SELECT ${this.fields} FROM ${this.table}`;

    if (this.condition) {
      query = query + ` WHERE ${this.condition}`;
    }

    if (this.limit) {
      query = query + ` LIMIT ${this.n}`;
    }

    return query;
  }
}

const queryBuilder = new QueryBuilder();
const query = queryBuilder
  .select(["employee_id", "first_name", "department", "salary"])
  .from("employees")
  .where("salary > 50000")
  .limit(5)
  .build();

console.log(query);

function createNotification({
  type = "nothing",
  message = "",
  duration = 3000,
  dismissible = true,
}) {
  return {
    type,
    message,
    duration,
    dismissible,
    show: () => {
      console.log(
        `type: ${type} -- message: ${message} -- duration: ${duration} -- dismissible: ${dismissible}`,
      );
    },
  };
}

const notificattion = createNotification({
  type: "success",
  message: "user added to the database",
});
notificattion.show();
console.log(notificattion.message);
