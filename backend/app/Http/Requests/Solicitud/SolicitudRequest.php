<?php

namespace App\Http\Requests\Solicitud;

use Illuminate\Foundation\Http\FormRequest;

class SolicitudRequest extends FormRequest
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
            'motivo' => 'required|string|max:255',
            'fecha_solicitud' => 'required|date',
            'hora_inicio' => 'required|date_format:H:i:s',
            'hora_fin' => 'required|date_format:H:i:s|after:hora_inicio',
            'estado' => 'required|in:Rechazado,Aceptado,Pendiente',
            'numero_estudiantes' => 'required|integer|min:1',
            'ambiente_id'=> 'required|exists:ambientes,id'
        ];
    }

    public function messages()
    {
        return [
            'motivo.required'          => 'El campo motivo es obligatorio.',
            'motivo.string'            => 'El campo motivo debe ser una cadena de caracteres.',
            'motivo.max'               => 'El campo motivo no debe exceder los 255 caracteres.',
            'fecha_solicitud.required' => 'El campo fecha de solicitud es obligatorio.',
            'fecha_solicitud.date'     => 'El campo fecha de solicitud debe ser una fecha válida.',
            'hora_inicio.required'     => 'El campo hora de inicio es obligatorio.',
            'hora_inicio.date_format'  => 'El campo hora de inicio debe estar en formato HH:MM.',
            'hora_fin.required'        => 'El campo hora de fin es obligatorio.',
            'hora_fin.date_format'     => 'El campo hora de fin debe estar en formato HH:MM.',
            'hora_fin.after'           => 'El campo hora de fin debe ser posterior a la hora de inicio.',
            'estado.required'          => 'El campo estado es obligatorio.',
            'estado.in'                => 'El estado seleccionado no es válido.',
            'numero_estudiantes.required' => 'El campo número de estudiantes es obligatorio.',
            'numero_estudiantes.integer'  => 'El campo número de estudiantes debe ser un número entero.',
            'numero_estudiantes.min'      => 'El campo número de estudiantes debe ser como mínimo 1.',
            'ambiente_id.required'        => 'El campo ambiente es obligatorio.',
            'ambiente_id.exists'          => 'El ambiente seleccionado no es válido.',
        ];
    }
}
