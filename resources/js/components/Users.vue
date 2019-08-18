<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">مشاهده کاربران</h3>
                    <div class="card-tools">
                        <button @click="newModel" type="button" class="btn btn-primary"
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
                                       <a href="" @click.prevent="editModel(user)">
                                       <i class="fas fa-edit text-info" title="ویرایش"></i>
                                       </a>
                                    <a href="" class="mx-2 text-danger" title="حذف" @click.prevent="DeleteUser(user.id)">
                                        <i class="fas fa-trash"></i>
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
                        <h5 v-if="!editMode" class="modal-title" id="addNewTitle">ایجاد کاربر</h5>
                        <h5 v-if="editMode" class="modal-title" id="addNewTitle">اپدیت کاربر</h5>

                    </div>
                    <form @submit.prevent="editMode ? updateUser() : createUser()">
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
                            <button v-if="!editMode" type="submit" class="btn btn-primary">ایجاد کردن</button>
                            <button v-if="editMode" type="submit" class="btn btn-primary">اپدیت</button>
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
                editMode:false, //if true so call update method
                users:{},
                form: new Form({
                    id:'',
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
            newModel(){
                //reset fields for next item
                    this.editMode = false;
                    this.form.reset();
                    $('#addNew').modal('show');
            },
            editModel(user){
                    this.editMode = true;
                    this.form.reset();
                    $('#addNew').modal('show');
                    this.form.fill(user);
            },

            createUser(){
                this.$Progress.start();
                this.form.post('api/user').then( () => {
                    Fire.$emit('AfterCreated');
                    $('#addNew').modal('hide');
                    Swal.fire({
                        position: 'top-start',
                        type: 'success',
                        title: 'با موفقیت اضافه شد!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$Progress.finish();
                }).catch( () => {

                });
            },
            //end CreateUser()

            updateUser(){
                this.$Progress.start();
                this.form.put('api/user/'+this.form.id)
                    .then(()=>{
                        Swal.fire(
                            'اپدیت شد!',
                        )
                        //refresh page after delete
                        this.$Progress.finish();
                        $('#addNew').modal('hide');
                        Fire.$emit('AfterCreated');
                }).catch(()=>{
                    this.$Progress.fail();
                })
            },

            DeleteUser(id) {
                Swal.fire({
                    title: 'مطمین هستید؟',
                    text: "",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'حذف'
                }).then((result) => {
                   if (result.value){
                       this.form.delete('api/user/'+id).then(()=>{
                           Swal.fire(
                               'حذف شد!',
                           )
                           //refresh page after delete
                           Fire.$emit('AfterCreated');
                       }).catch(()=>{
                           Swal.fire(
                               'خطا!',
                           )
                       })
                   }
                })
            },
            loadUsers(){
                axios.get('api/user')
                    .then(({data})=> (
                        // console.log(data)
                        this.users = data.data));
            }
        },
       created() {
            this.loadUsers()
           //use setinterval
           // setInterval(() => this.loadUsers() ,20000)
           Fire.$on('AfterCreated' , () => {
               this.loadUsers();
           })
        }
    }
</script>
