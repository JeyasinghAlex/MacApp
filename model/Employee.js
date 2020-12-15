const db = require('../utils/db_connection');
let conn = db.getConnection();

function Employee(employee) {
  this.name = employee.name;
  this.email = employee.email;
  this.contactNumber = employee.contactNumber;
  // this.adminName = employee.adminName;
  // this.project = employee.project;
}

Employee.create = (employee, result) => {
  console.log(employee.name);
  const query = "INSERT INTO employee (name, email, number) VALUES (?, ?, ?)";
  conn.query(query, [employee.name, employee.email, employee.contactNumber], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res });
  });
}

Employee.getAll = (result) => {
  const query = "SELECT * FROM employee";
  conn.query(query, (err, data) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("employees: ", data);
    result(null, data);
  });
};

Employee.get = (id, result) => {
  const query = "SELECT * FROM employee WHERE id = ?";
  conn.query(query, [id], (err, data) => {
    if (err) {
      console.log("error :", err);
      result(null, err);
      return;
    }
    if (data.length) {
      console.log("found employee: ", data);
      result(null, data);
      return;
    }
    result({ kind: "not_found" }, null);
  });
}

Employee.update = (id, employee, result) => {
  const query = "UPDATE employee SET name = ?, email = ?, number = ? WHERE id = ?";
  conn.query(query, [employee.name, employee.email, employee.contactNumber, id], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, { id: id, ...employee });
  });
};

Employee.remove = (id, result) => {
  console.log("-------" + id);
  const query = "DELETE FROM employee WHERE id = ?";
  conn.query(query, [id], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted employee with id: ", id);
    result(null, res);
  });
};

Employee.findById = async (id, result) => {
  const query = "SELECT * FROM employee WHERE id = ?";
  conn.query(query, [id], async (err, res) => {
    if (err) return;
    // console.log(res);
    result(null, res)
    return ;
  });
}

module.exports = Employee;