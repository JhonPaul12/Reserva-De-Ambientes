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
            'apellidos' => 'nullable|string|max:50',
            'telefono' => 'nullable|string|max:15',
            'codigo_sis' => 'required|string|max:10|unique:users,codigo_sis',
            "email"=> "required|email|unique:users,email",
            "password"=> "required|min:6|max:18"
        ];
    }

    public function messages()
    {
     return [
        "name.required" => "El campo nombre es requerido",
        "name.min" => "El nombre es muy corto",
        "email.required" => "El campo email es requerido",
        "email.email" => "Ingrese un correo valido",
        "email.unique" => "Ya se registro un usuario con este correo",
        "password.required" => "El campo password es requerido",
        "password.min" => "La contraseña es muy corta",
        "password.max" => "La contraseña es muy larga",
        'codigo_sis.unique' => 'Ya se registro un codigo sis ',
     ];   
    }
}
