<?php

namespace App\Http\Controllers\API;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
//    public function __construct()
//    {
//        $this->middleware('auth');  // در api کار نمیکند
//    }
//passport information
//Client secret: 77HqRTGvxPdFoOmGtxeEECubCii2Gwsxoy7PYpML
//Password grant client created successfully.
//Client ID: 2
//Client secret: HW5qDMtpEEpHsKWX5qNgF10XV1VSPs6awCHQKRcy


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::latest()->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function store(Request $request)
    {
        $request->validate([
           'name' => 'required|max:191',
           'email' => 'required | string |email|max:255|unique:users',
            'password' => 'required|min:6'
        ]);
       return User::create([
          'name' =>$request->name,
          'email' =>$request->email,
          'password' =>bcrypt($request->password),
          'bio' =>$request->bio,
          'photo' =>$request->photo,
          'type' =>$request->type,

       ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $request->validate([
            'name' => 'required|max:191',
            'email' => 'required | string |email|max:255|unique:users,email,'.$user->id, //email field in the current user can be writed
            'password' => 'required|min:6'
        ]);
        $user->update($request->all());
        return ['message' => 'با موفقیت اپدیت شد!'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user=User::findOrFail($id);
        $user->delete();
        return ['message' => 'با موفقیت حذف شد'];
    }
}
