<template>
  <div class="container" data-intro="Hello! My name is Abdelkoddous & this is my machine test" data-step="1">
    <div class="mt-5 d-flex">
      <button data-intro="After adding new category, You can add a product" data-step="3" class="btn btn-primary" @click="addNewProduct()">
        <span class="me-2"><i class="fas fa-plus"></i></span> Product
      </button>
      <button data-intro="From this button, You can add new category" data-step="2" class="btn btn-primary ms-2" @click="addNewCategory()">
        <span class="me-2"><i class="fas fa-plus"></i></span> Category
      </button>
      <div class="form-group ms-auto" data-intro="You can use this input to search for products (this will fetch the data from the backend)." data-step="6" >
        <input
          type="text"
          class="form-control"
          name=""
          id=""
          aria-describedby="helpId"
          placeholder=""
          v-model="search"
          @keyup.enter="SearchProducts()"
        />
      </div>
      <button class="btn-primary btn ms-1" @click="SearchProducts()">
        <span class="me">
          <i class="fas fa-search"></i>
        </span>
      </button>
    </div>

    <div class="row mt-3" data-intro="In this table you can see, all your products." data-step="4" >
      <div class="col-12" data-intro="To edit or delete product, you should click on the name of product." data-step="5" >
        <table class="table table-striped table-hover">
          <thead>
            <tr data-intro="You can click on any column to order the table based on it." data-step="7" >
              <th scope="col" style="cursor:pointer" @click="orderBy('id')" >
                product#
                <template v-if="order['id']">
                  <span
                    :class="order['id'] == 'desc' ? 'd-none' : ''"
                    class="ms-2"
                  >
                    <i class="fas fa-chevron-up"></i>
                  </span>
                  <span
                    :class="order['id'] == 'asc' ? 'd-none' : ''"
                    class="ms-2"
                  >
                    <i class="fas fa-chevron-down"></i>
                  </span>
                </template>
                <template v-else>
                  <span class="ms-2">
                    <i class="fas fa-minus"></i>
                  </span>
                </template>
              </th>
              <th scope="col" style="cursor:pointer" @click="orderBy('name')">
                name
                <template v-if="order['name']">
                  <span
                    :class="order['name'] == 'desc' ? 'd-none' : ''"
                    class="ms-2"
                  >
                    <i class="fas fa-chevron-up"></i>
                  </span>
                  <span
                    :class="order['name'] == 'asc' ? 'd-none' : ''"
                    class="ms-2"
                  >
                    <i class="fas fa-chevron-down"></i>
                  </span>
                </template>
                <template v-else>
                  <span class="ms-2">
                    <i class="fas fa-minus"></i>
                  </span>
                </template>
              </th>
              <th
                scope="col"
                style="cursor:pointer"
                @click="orderBy('category')"
              >
                category
                <template v-if="order['category']">
                  <span
                    :class="order['category'] == 'desc' ? 'd-none' : ''"
                    class="ms-2"
                  >
                    <i class="fas fa-chevron-up"></i>
                  </span>
                  <span
                    :class="order['category'] == 'asc' ? 'd-none' : ''"
                    class="ms-2"
                  >
                    <i class="fas fa-chevron-down"></i>
                  </span>
                </template>
                <template v-else>
                  <span class="ms-2">
                    <i class="fas fa-minus"></i>
                  </span>
                </template>
              </th>
              <th
                scope="col"
                style="cursor:pointer"
                @click="orderBy('quantity')"
              >
                quantity
                <template v-if="order['quantity']">
                  <span
                    :class="order['quantity'] == 'desc' ? 'd-none' : ''"
                    class="ms-2"
                  >
                    <i class="fas fa-chevron-up"></i>
                  </span>
                  <span
                    :class="order['quantity'] == 'asc' ? 'd-none' : ''"
                    class="ms-2"
                  >
                    <i class="fas fa-chevron-down"></i>
                  </span>
                </template>
                <template v-else>
                  <span class="ms-2">
                    <i class="fas fa-minus"></i>
                  </span>
                </template>
              </th>
              <th scope="col" style="cursor:pointer" @click="orderBy('status')">
                status
                <template v-if="order['status']">
                  <span
                    :class="order['status'] == 'desc' ? 'd-none' : ''"
                    class="ms-2"
                  >
                    <i class="fas fa-chevron-up"></i>
                  </span>
                  <span
                    :class="order['status'] == 'asc' ? 'd-none' : ''"
                    class="ms-2"
                  >
                    <i class="fas fa-chevron-down"></i>
                  </span>
                </template>
                <template v-else>
                  <span class="ms-2">
                    <i class="fas fa-minus"></i>
                  </span>
                </template>
              </th>
            </tr>
            <tr @click="orderBy('id')" data-intro="You can use this columns to filter this table." data-step="8" >
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

    <!-- Create Product Modal -->
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
              @click="clear()"
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
                    :class="add_product_errors.name ? 'is-invalid' : ''"
                    aria-describedby="helpId"
                    placeholder=""
                  />
                </div>
                <small
                  :class="add_product_errors.name ? '' : 'd-none'"
                  class="text-danger"
                >
                  {{ add_product_errors.name }}
                </small>
              </div>
              <div class="col-12 mb-2">
                <div class="form-group">
                  <label for="">category : </label>
                  <select
                    class="form-control"
                    name=""
                    id=""
                    v-model="product.category"
                    :class="add_product_errors.category ? 'is-invalid' : ''"
                  >
                    <option
                      v-for="(categorie, i) in categories"
                      :key="'categorie_' + i"
                      :value="categorie.name"
                      >{{ categorie.name }}</option
                    >
                  </select>
                  <small
                    :class="add_product_errors.category ? '' : 'd-none'"
                    class="text-danger"
                  >
                    {{ add_product_errors.category }}
                  </small>
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
                    :class="add_product_errors.quantity ? 'is-invalid' : ''"
                    aria-describedby="helpId"
                    placeholder=""
                  />
                  <small
                    :class="add_product_errors.quantity ? '' : 'd-none'"
                    class="text-danger"
                  >
                    {{ add_product_errors.quantity }}
                  </small>
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
                    :class="add_product_errors.status ? 'is-invalid' : ''"
                  >
                    <option
                      v-for="(statu, i) in status"
                      :key="'statu_' + i"
                      :value="statu"
                      >{{ statu }}</option
                    >
                  </select>
                  <small
                    :class="add_product_errors.status ? '' : 'd-none'"
                    class="text-danger"
                  >
                    {{ add_product_errors.status }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="clear()"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="CreateProduct()"
            >

              <span :class="loading.create_product?'':'d-none'" class="me-2" ><i class="fas fa-circle-notch fa-spin"></i></span>
               Create 
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- / Create Product Modal -->

    <!-- Update Product Modal -->
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
                    :class="edit_product_errors.name ? 'is-invalid' : ''"
                    aria-describedby="helpId"
                    placeholder=""
                  />
                  <small
                    :class="edit_product_errors.name ? '' : 'd-none'"
                    class="text-danger"
                  >
                    {{ edit_product_errors.name }}
                  </small>
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
                    :class="edit_product_errors.category ? 'is-invalid' : ''"
                  >
                    <option
                      v-for="(categorie, i) in categories"
                      :key="'categorie_' + i"
                      :value="categorie.name"
                      >{{ categorie.name }}</option
                    >
                  </select>
                  <small
                    :class="edit_product_errors.category ? '' : 'd-none'"
                    class="text-danger"
                  >
                    {{ edit_product_errors.category }}
                  </small>
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
                    :class="edit_product_errors.quantity ? 'is-invalid' : ''"
                    aria-describedby="helpId"
                    placeholder=""
                  />
                  <small
                    :class="edit_product_errors.quantity ? '' : 'd-none'"
                    class="text-danger"
                  >
                    {{ edit_product_errors.quantity }}
                  </small>
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
                    :class="edit_product_errors.status ? 'is-invalid' : ''"
                  >
                    <option
                      v-for="(statu, i) in status"
                      :key="'statu_' + i"
                      :value="statu"
                      >{{ statu }}</option
                    >
                  </select>
                  <small
                    :class="edit_product_errors.status ? '' : 'd-none'"
                    class="text-danger"
                  >
                    {{ edit_product_errors.status }}
                  </small>
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
              <span :class="loading.update_product?'':'d-none'" class="me-2" ><i class="fas fa-circle-notch fa-spin"></i></span>
              Update
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="DeleteProduct()"
            >
              <span :class="loading.delete_product?'':'d-none'" class="me-2" ><i class="fas fa-circle-notch fa-spin"></i></span>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- / Update Product Modal -->

    <!-- Create Category Modal -->
    <div
      class="modal fade"
      id="addNewCategoryModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addNewCategoryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addNewCategoryModalLabel">
              Add new category
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="clear()"
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
                    v-model="category.name"
                    :class="add_category_errors.name ? 'is-invalid' : ''"
                    aria-describedby="helpId"
                    placeholder=""
                  />
                </div>
                <small
                  :class="add_product_errors.name ? '' : 'd-none'"
                  class="text-danger"
                >
                  {{ add_product_errors.name }}
                </small>
              </div>
            </div>
            <div class="mt-3">
              <label>list of categories : 
                  <span :class="loading.delete_category?'':'d-none'" class="ms-2" ><i class="fas fa-circle-notch fa-spin"></i></span>
                  <span :class="loading.create_category?'':'d-none'" class="ms-2" ><i class="fas fa-circle-notch fa-spin"></i></span>
              </label>
              <div class="list-categories row">
                <div
                  class="col-12"
                  v-for="(category, i) in categories"
                  :key="'list_categories_' + i"
                >
                  <div class="category-item mb-3">
                    <span>{{ category.name }}</span>
                    
                    <button
                      class="btn ms-auto"
                      @click="DeleteCategory(category)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="clear()"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="CreateCategory()"
            >
              <span :class="loading.create_category?'':'d-none'" class="me-2" ><i class="fas fa-circle-notch fa-spin"></i></span>
              Create
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
import apiCategories from "../api/categories";
import "intro.js/minified/introjs.min.css";

export default {
  data() {
    return {
      products: [],
      products_filter: [],
      product: [],
      categories: ["categorie 1", "categorie 2"],
      category: {},
      status: ["active", "inactive"],
      search: "",
      filter: {},
      order: {},
      edit_product_errors: {},
      add_product_errors: {},
      add_category_errors: {},
      loading : {
          delete_category : false,
          create_category : false,
          update_product : false,
          delete_product : false,
          create_product : false
      }
    };
  },
  mounted() {
    this.LoadCategories();
    this.LoadProducts();

    const introJS = require("intro.js");
    introJS('body').start();
  },
  methods: {
    LoadProducts() {
      let validation = apiProducts.all({}, (r) => {
        if (r?.data) {
          this.products = r.data;
          this.orderBy();
          this.clear();
        }
      });

      console.log(validation);
    },
    SearchProducts() {
      if (!this.search) {
        this.LoadProducts();
        return;
      }

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
        let state = true;
        console.log(prod);

        if (this.filter?.name) {
          if (prod.name?.indexOf(this.filter?.name) == -1) {
            state &= false;
          }
        }

        if (this.filter?.category) {
          if (prod.category?.indexOf(this.filter?.category) == -1) {
            state &= false;
          }
        }

        return state;
      });
    },
    CreateProduct() {
        this.loading.create_product = true;
      let validation = apiProducts.store(this.product, (r) => {
        this.loading.create_product = false;
        if (r?.data) {
          window.$("#addNewModal").modal("hide");
          this.LoadProducts();
          this.clear();
        }
      });

      this.add_product_errors = {};
      validation?.data.forEach((v) => {
        this.add_product_errors[v.arg] = v.message;
      });
    },
    UpdateProduct() {
        this.loading.update_product = true;

      let validation = apiProducts.update(this.product, (r) => {
          this.loading.update_product = false;
        if (r?.data) {
          console.log(r);
          window.$("#editModal").modal("hide");
          this.LoadProducts();
          this.clear();
        }
      });

      console.log(validation);

      this.edit_product_errors = {};
      validation?.data.forEach((v) => {
        this.edit_product_errors[v.arg] = v.message;
      });
    },
    DeleteProduct() {
        this.loading.delete_product = true;
      let validation = apiProducts.delete(this.product, (r) => {
          this.loading.delete_product = false;
        if (r?.data) {
          console.log(r);
          window.$("#editModal").modal("hide");
          this.LoadProducts();
          this.clear();
        }
      });

      console.log(validation);
    },
    addNewProduct() {
      this.clear();
      this.product = {};
      window.$("#addNewModal").modal("show");
    },
    editProduct(product) {
      this.clear();
      this.product = { ...product };
      window.$("#editModal").modal("show");
    },
    orderBy(col) {
      console.log(this.order[col]);
      if (this.order[col] == "asc") {
        this.order[col] = "desc";
        this.products.sort((a, b) => {
          return a[col] > b[col] ? 1 : b[col] > a[col] ? -1 : 0;
        });
        this.filterChange();
      } else if (this.order[col] == "desc") {
        this.order[col] = "asc";
        this.products.sort((a, b) => {
          return a[col] < b[col] ? 1 : b[col] < a[col] ? -1 : 0;
        });
        this.filterChange();
      } else {
        this.order[col] = "desc";
        this.products.sort((a, b) => {
          return a[col] > b[col] ? 1 : b[col] > a[col] ? -1 : 0;
        });
        this.filterChange();
      }
    },
    clear() {
      this.product = {};
      this.edit_product_errors = {};
      this.add_product_errors = {};

      this.category = {};
      this.add_category_errors = {};
    },
    LoadCategories() {
      let validation = apiCategories.all({}, (r) => {
        if (r?.data) {
          this.categories = r.data;
          this.clear();
        }
      });

      console.log(validation);
    },
    addNewCategory() {
      this.clear();
      this.product = {};
      window.$("#addNewCategoryModal").modal("show");
    },
    CreateCategory() {
        this.loading.create_category = true;
      let validation = apiCategories.store(this.category, (r) => {
          this.loading.create_category = false;
        if (r?.data) {
          //  window.$("#addNewCategoryModal").modal("hide");
          this.LoadCategories();
          this.clear();
        }
      });

      this.add_category_errors = {};
      validation?.data.forEach((v) => {
        this.add_category_errors[v.arg] = v.message;
      });
    },
    DeleteCategory(category) {
        this.loading.delete_category = true;
      let validation = apiCategories.delete(category, (r) => {
          this.loading.delete_category = false;
        if (r?.data) {
          console.log(r);
          this.LoadCategories();
          this.clear();
        }
      });

      console.log(validation);
    },
  },
};
</script>

<style>
.category-item {
  display: flex;
  padding: 5px;
  align-items: center;
  border: 1px dashed;
  border-radius: 5px;
}
.category-item:hover,
.category-item:hover .btn {
  color: blue;
}

.category-item:hover .btn:hover {
  color: red !important;
}

.list-categories {
  max-height: 325px;
  overflow-y: scroll;
}

/* width */
.list-categories::-webkit-scrollbar {
  width: 3px;
}

/* Track */
.list-categories::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
.list-categories::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.list-categories::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
