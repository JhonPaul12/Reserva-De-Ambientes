<?php

namespace App\Http\Resources\Solicitud;

use Illuminate\Http\Resources\Json\ResourceCollection;

class SolicitudCollection extends ResourceCollection
{

    public static $wrap = "solicitudes";
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
