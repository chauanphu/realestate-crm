<template>
  <div class="container-fluid px-4">
    <div class="row">
      <div class="col">
        <button type="button" class="btn btn-success">Them</button>
      </div>
    </div>
    <hr />
    <div class="row">
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Ten</th>
            <th scope="col">Email</th>
            <th scope="col">Lich hen sap toi</th>
            <th scope="col">Noi dung</th>
            <th scope="col">Tien do</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <select class="form-select" aria-label="Default select example">
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </td>
            <td>chauanphu@gmail.com</td>
            <td><Datepicker /></td>
            <td>
              <input
                class="form-control"
                type="text"
                placeholder="Default input"
                aria-label="default input example"
              />
            </td>
            <td>
              <select class="form-select" aria-label="Default select example">
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </td>
            <td><button class="btn btn-danger">Xoa</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
export default {
  name: "Home",
  components: { Datepicker },
};
</script>
