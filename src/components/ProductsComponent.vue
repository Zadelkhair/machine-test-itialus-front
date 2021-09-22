<template>
  <div class="container">
    <div class="mt-5 d-flex">
      <button class="btn btn-primary" @click="addNewProduct()">Add new</button>
      <div class="form-group ms-auto">
        <input
          type="text"
          class="form-control"
          name=""
          id=""
          aria-describedby="helpId"
          placeholder=""
          v-model="search"
        />
      </div>
      <button class="btn-primary btn ms-2" @click="SearchProducts()">
        search
      </button>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">product#</th>
              <th scope="col">name</th>
              <th scope="col">category</th>
              <th scope="col">quantity</th>
              <th scope="col">status</th>
            </tr>
            <tr>
              <th></th>
              <th>
                <input
                  class="form-control"
                  v-model="filter.name"
                  @input="filterChange('name')"
                  type="text"
                />
              </th>
              <th>
                <input
                  class="form-control"
                  v-model="filter.category"
                  @input="filterChange('category')"
                  type="text"
                />
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <template v-if="filter && (filter.name || filter.category)">
              <tr
                v-for="product in products_filter"
                :key="product.id"
                style="cursor:pointer"
                @click="editProduct(product)"
              >
                <th scope="row">{{ product.id }}</th>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{ product.status }}</td>
              </tr>
            </template>
            <template v-else>
              <tr
                v-for="product in products"
                :key="product.id"
                style="cursor:pointer"
                @click="editProduct(product)"
              >
                <th scope="row">{{ product.id }}</th>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{ product.status }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Modal -->
    <div
      class="modal fade"
      id="addNewModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addNewModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addNewModalLabel">Add new product</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 mb-2">
                <div class="form-group">
                  <label for="">name : </label>
                  <input
                    type="text"
                    class="form-control"
                    name=""
                    id=""
                    v-model="product.name"
                    aria-describedby="helpId"
                    placeholder=""
                  />
                </div>
              </div>
              <div class="col-12 mb-2">
                <div class="form-group">
                  <label for="">category : </label>
                  <select
                    class="form-control"
                    name=""
                    id=""
                    v-model="product.category"
                  >
                    <option
                      v-for="(categorie, i) in categories"
                      :key="'categorie_' + i"
                      :value="categorie"
                      >{{ categorie }}</option
                    >
                  </select>
                </div>
              </div>
              <div class="col-12 mb-2">
                <div class="form-group">
                  <label for="">quantity : </label>
                  <input
                    type="number"
                    class="form-control"
                    name=""
                    id=""
                    v-model="product.quantity"
                    aria-describedby="helpId"
                    placeholder=""
                  />
                </div>
              </div>
              <div class="col-12 mb-2">
                <div class="form-group">
                  <label for="">status : </label>
                  <select
                    class="form-control"
                    name=""
                    id=""
                    v-model="product.status"
                  >
                    <option
                      v-for="(statu, i) in status"
                      :key="'statu_' + i"
                      :value="statu"
                      >{{ statu }}</option
                    >
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="CreateProduct()"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- / Create Modal -->

    <!-- Update Modal -->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Update product</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 mb-2">
                <div class="form-group">
                  <label for="">id : </label>
                  <input
                    type="text"
                    class="form-control"
                    name=""
                    id=""
                    v-model="product.id"
                    aria-describedby="helpId"
                    placeholder=""
                    readonly
                  />
                </div>
              </div>
              <div class="col-12 mb-2">
                <div class="form-group">
                  <label for="">name : </label>
                  <input
                    type="text"
                    class="form-control"
                    name=""
                    id=""
                    v-model="product.name"
                    aria-describedby="helpId"
                    placeholder=""
                  />
                </div>
              </div>
              <div class="col-12 mb-2">
                <div class="form-group">
                  <label for="">category : </label>
                  <select
                    class="form-control"
                    name=""
                    id=""
                    v-model="product.category"
                  >
                    <option
                      v-for="(categorie, i) in categories"
                      :key="'categorie_' + i"
                      :value="categorie"
                      >{{ categorie }}</option
                    >
                  </select>
                </div>
              </div>
              <div class="col-12 mb-2">
                <div class="form-group">
                  <label for="">quantity : </label>
                  <input
                    type="number"
                    class="form-control"
                    name=""
                    id=""
                    v-model="product.quantity"
                    aria-describedby="helpId"
                    placeholder=""
                  />
                </div>
              </div>
              <div class="col-12 mb-2">
                <div class="form-group">
                  <label for="">status : </label>
                  <select
                    class="form-control"
                    name=""
                    id=""
                    v-model="product.status"
                  >
                    <option
                      v-for="(statu, i) in status"
                      :key="'statu_' + i"
                      :value="statu"
                      >{{ statu }}</option
                    >
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="UpdateProduct()"
            >
              Update
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="DeleteProduct()"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- / Create Modal -->
  </div>
</template>

<script>
import apiProducts from "../api/products";

export default {
  data() {
    return {
      products: [],
      products_filter: [],
      product: [],
      categories: ["categorie 1", "categorie 2"],
      status: ["active", "inactive"],
      search: "",
      filter: {},
    };
  },
  mounted() {
    this.LoadProducts();
  },
  methods: {
    LoadProducts() {
      let validation = apiProducts.all({}, (r) => {
        if (r?.data) {
          this.products = r.data;
        }
      });

      console.log(validation);
    },
    SearchProducts() {
      let validation = apiProducts.search({ search: this.search }, (r) => {
        if (r?.data?.data) {
          this.products = r.data.data;
        }
      });

      console.log(validation);
    },
    // filterChange(col,value,type) {
    //   let validation = apiProducts.find({
    //       by : col,
    //       value:value,
    //       type:type
    //    }, (r) => {
    //     if (r?.data?.data) {
    //       this.products = r.data.data;
    //     }
    //   });

    //   console.log(validation);
    // },
    filterChange(col) {
      console.log(col);
      this.products_filter = this.products.filter((prod) => {
        let state = false;
        console.log(prod);

        if (this.filter?.name) {
          if (prod.name?.indexOf(this.filter?.name) != -1) {
            state = true;
          }
        }

        if (this.filter?.name) {
          if (prod.name?.indexOf(this.filter?.name) != -1) {
            state = true;
          }
        }

        return state;
      });
    },
    CreateProduct() {
      let validation = apiProducts.store(this.product, (r) => {
        if (r?.data) {
          window.$("#addNewModal").modal("hide");
          this.LoadProducts();
        }
      });

      console.log(validation);
    },
    UpdateProduct() {
      let validation = apiProducts.update(this.product, (r) => {
        if (r?.data) {
          console.log(r);
          window.$("#editModal").modal("hide");
          this.LoadProducts();
        }
      });

      console.log(validation);
    },
    DeleteProduct() {
      let validation = apiProducts.delete(this.product, (r) => {
        if (r?.data) {
          console.log(r);
          window.$("#editModal").modal("hide");
          this.LoadProducts();
        }
      });

      console.log(validation);
    },
    addNewProduct() {
      this.product = {};
      window.$("#addNewModal").modal("show");
    },
    editProduct(product) {
      this.product = { ...product };
      window.$("#editModal").modal("show");
    },
  },
};
</script>

<style>
.container {
  width: 100%;
}
</style>
