<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class AuthRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "name" => "required|min:4",
            "email"=> "required|email|unique:user,email",
            "password"=> "required|min:6|max:18"
        ];
    }

    public function messages()
    {
     return [
         "name.required" => "El campo es requerido",
         "name.min" => "El nombre es corto",
         "email.required"=> "El campo email es requerido",
         "email.email"=> "Ingrese un correo valido",
         "email.unique"=> "Ya se registro un usuario con este correo",
        "password.required"=> "El campo es requerido",
        "password.min"=> "El password es muy corta",
        "password.max"=> "El password es muy larga",
     ];   
    }
}
