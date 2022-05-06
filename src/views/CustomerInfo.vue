<template>
  <div class="container-fluid px-4">
    <router-link to="/cards" class="btn btn-light mb-4">Quay lai</router-link>
    <div class="row">
      <div class="col-4">
        <form>
          <div class="form-group mb-2">
            <label for="exampleFormControlInput1">Ho va Ten</label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div class="form-group mb-2">
            <label for="exampleFormControlInput1">Email</label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div class="form-group mb-2">
            <label for="exampleFormControlInput1">SDT</label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div class="form-group mb-2">
            <label for="exampleFormControlInput1">Tuoi</label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
        </form>
      </div>
      <div class="col-8">
        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">Lich hen sap toi</th>
              <th scope="col">Noi dung</th>
              <th scope="col"><button class="btn btn-success">Them</button></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="w-25"><Datepicker /></td>
              <td>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Default input"
                  aria-label="default input example"
                />
              </td>
              <td><button class="btn btn-danger">Xoa</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";

export default {
  components: { Datepicker },
};
</script>

<style></style>
