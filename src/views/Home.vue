<template>
  <div class="container-fluid px-4">
    <button type="button" class="btn btn-success mb-4">Them</button>
    <div class="row">
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Ten</th>
            <th scope="col">Email</th>
            <th scope="col">Lich hen sap toi</th>
            <th scope="col">Noi dung</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Selectbox />
            </td>
            <td>chauanphu@gmail.com</td>
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
</template>

<script>
// @ is an alias to /src
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Selectbox from "@/components/Selectbox.vue";

export default {
  name: "Home",
  components: { Datepicker, Selectbox },
};
</script>
