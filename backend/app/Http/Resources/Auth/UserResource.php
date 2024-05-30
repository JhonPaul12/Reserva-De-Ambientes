<?php

namespace App\Http\Resources\Auth;


use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{

    public static $wrap = "users";

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'apellidos' => $this->apellidos,
            'telefono' => $this->telefono,
            'codigo_sis' => $this->codigo_sis,
            'email' => $this->email,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'roles' => $this->rols->pluck('nombre_rol')
        ];
    }
}
