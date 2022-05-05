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
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Chau An Phu</td>
            <td>chauanphu@gmail.com</td>
            <td>@mdo</td>
            <td>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
              perferendis.
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

export default {
  name: "Home",
  components: {},
};
</script>
