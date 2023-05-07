<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::create([
            'name' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        Auth::login($user);

        return response()->json([
            'data' => Auth::user()
        ], 201);
    }

    public function login(Request $request)
    {
        $user = Auth::attempt(['name' => $request->username, 'password' => $request->password]);

        if($user) {
            return response()->json([
                'data' => Auth::user(),
            ], 200);
        } else {
            throw new Exception('نام کاربری یا رمز عبور نادرست است.');
        }

    }

    public function logout()
    {
        session()->invalidate();

        Auth::logout();

        return response()->json([
            'message' => 'logged out'
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::findOrFail($id);

        return response()->json([
            'data' => new UserResource($user)
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
