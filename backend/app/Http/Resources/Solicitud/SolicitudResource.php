<?php

namespace App\Http\Resources\Solicitud;

use App\Models\Ambiente;
use App\Models\Solicitud;
use App\Models\User;
use GuzzleHttp\Psr7\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SolicitudResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray( $request) :array
    {
        
        
        $ambiente = Ambiente::find($this->ambiente_id);
        $user = Solicitud::find($this->id)->users;


        return [
            'id' => $this->id,
            'motivo' => $this->motivo,
            'fecha_solicitud' => $this->fecha_solicitud,
            'hora_inicio' => $this->hora_inicio,
            'hora_fin' => $this->hora_fin,
            'estado' => $this->estado,
            'numero_estudiantes' => $this->numero_estudiantes,
            'ambiente' => $ambiente,
            'usuarios' => $user,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
