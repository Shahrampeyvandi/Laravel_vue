<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">مشاهده کاربران</h3>
                    <div class="card-tools">
                        <button type="button" class="btn btn-primary"
                                data-toggle="modal" data-target="#addNew">
                            <i class="fas fa-user-plus"></i>
                            افزودن کاربر</button>
                    </div>

                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0 text-right">
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th>نام</th>
                                <th>ایمیل</th>
                                <th>سمت</th>
                                <th>عملیات</th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{user.name }}</td>
                                <td>{{user.email}}</td>
                                <td>{{user.type}}</td>
                                <td>
                                       <a href="">edit
                                       <i class="fas fa-edit"></i>
                                       </a>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewTitle" aria-hidden="true">
            <div class="modal-dialog model-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addNewTitle">نام</h5>

                    </div>
                    <form @submit.prevent="createUser">
                        <div class="modal-body">

                            <div class="form-group">
                                <input type="text" v-model="form.name" name="name"
                                class="form-control text-right" :class="{ 'is-invalid' :
                                form.errors.has('name') }">
                                <has-error :form="form" field="name"></has-error>
                            </div>

                            <div class="form-group">
                                <input type="email" v-model="form.email" name="email"
                                       class="form-control text-right" :class="{ 'is-invalid' :
                                form.errors.has('email') }">
                                <has-error :form="form" field="email"></has-error>
                            </div>


                         <div class="form-group">
                             <select name="type" id="type" v-model="form.type"
                             class="custom-select" :class="{'is-invalid' : form.errors.has('type') }">
                                 <option value="">سمت کاربر را انتخاب کنید</option>
                                 <option value="admin">مدیر</option>
                                 <option value="auther">نویسنده</option>
                                 <option value="user">کاربر عادی</option>
                             </select>
                         </div>
                            <div class="form-group">
                                <input type="text" v-model="form.password" name="password"
                                       class="form-control text-right" :class="{ 'is-invalid' :
                                form.errors.has('password') }">
                                <has-error :form="form" field="password"></has-error>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">بستن</button>
                            <button type="submit" class="btn btn-primary">ایجاد کردن</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                users:{},
                form: new Form({
                    name: '',
                    email:'',
                    password:'',
                    type:'',
                    bio:'',
                    photo:''
                })
            }
        },
        methods: {
            createUser(){
                this.form.post('api/user');
            },
            loadUsers(){
                axios.get('api/user')
                    .then(({data})=> (this.users = data.data))
            }
        },
       created() {
            this.loadUsers()
        }
    }
</script>
