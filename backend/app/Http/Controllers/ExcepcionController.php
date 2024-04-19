<?php

namespace App\Http\Controllers;
use App\Models\Excepcion;
use Illuminate\Http\Request;

class ExcepcionController extends Controller
{
    public function index()
    {
        $exc = Excepcion::all();
        return response()->json($exc,200);
    }

    public function store(Request $request)
    {

    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
