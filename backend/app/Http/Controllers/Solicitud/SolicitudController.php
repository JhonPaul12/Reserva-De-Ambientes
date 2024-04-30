<?php

namespace App\Http\Controllers\Solicitud;

use App\Http\Controllers\Controller;
use App\Http\Requests\Solicitud\SolicitudRequest;
use App\Http\Resources\Solicitud\SolicitudCollection;
use App\Http\Resources\Solicitud\SolicitudResource;
use App\Models\Solicitud;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Expr\FuncCall;
use Symfony\Contracts\Service\Attribute\Required;

class SolicitudController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $solicitudes = Solicitud::all();
        return ['solicitudes' => SolicitudResource::collection($solicitudes)];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SolicitudRequest $request)
    {
        $solicitud = $request -> validated();

        $solicitud = Solicitud::create($solicitud);

        return response()->json([
            'message' => 'se guardo con exito',
            'solicitud' => $solicitud
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
        $solicitud = Solicitud::find($id);
        return ['solicitud' => new SolicitudResource($solicitud)];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(SolicitudRequest $request, $id)
    {
        $solicitud = Solicitud::findOrFail($id);

        $validatedData = $request->validated();

        $solicitud->update($validatedData);

        return response()->json([
            'message' => 'La solicitud se actualizó con éxito',
            'solicitud' => new SolicitudResource($solicitud)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $solicitud = Solicitud::findOrFail($id);

        $solicitud->delete();

        return response()->json([
            'message' => 'La solicitud se eliminó con éxito'
        ]);
    }



    public function postDocente(Request $request){
        //'name', 'apellidos', 'telefono', 'codigo_sis', 'email', 'password',
        $usuario = new User();
        $usuario->name      = $request->name;          
        $usuario->apellido  = $request->apellido;
        $usuario->telefono  = $request->telefono;
        $usuario->codigo_sis= $request->codigo_sis;
        $usuario->email     = $request->email;
        $usuario->password  = $request->password;
        $usuario->solicitud_user = $request->solicitud_user;

        $usuario->save();

        $arr = [];
        $solicitudes = $request->solicitudes;


        foreach($solicitudes as $solicitud){

            $arr[] = [
                
            ];
        }


        return $usuario;
    }

}
