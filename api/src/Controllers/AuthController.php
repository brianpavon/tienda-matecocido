<?php

namespace Controllers;

use Components\GenericResponse;
use Components\PassManager;
use Models\Usuario;
use Components\Token;
use Generator;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


class AuthController
{
    //Funcion que verifica credenciales y loguea
    public function login(Request $request, Response $response){
        try {
            $email = isset($request->getParsedBody()['email']) ? $request->getParsedBody()['email'] : '';
            $clave = isset($request->getParsedBody()['clave']) ? $request->getParsedBody()['clave'] : '';
            
            if(empty($email)){
                $response->getBody()->write(GenericResponse::obtain(false,'Debe enviar un mail para loguearse.',$email));
                $response->withStatus(400);
            }else if(empty($clave)){
                $response->getBody()->write(GenericResponse::obtain(false,'Debe enviar la clave del mail para loguearse.',$clave));
                $response->withStatus(400);
            }else{
                $userLogged = Usuario::where([
                    ['email',$email],
                    ['clave', PassManager::Hash($clave)],])
                    ->first();
                if(!$userLogged){
                    $response->getBody()->write(GenericResponse::obtain(false,'Verifique las credenciales ingresadas, no se encontró ningún usuario.',$userLogged));
                    $response->withStatus(400);
                }else{
                    $token = Token::getToken($userLogged->email,$userLogged->id_rol);
                    $userLogged->token = $token;
                    $response->getBody()->write(GenericResponse::obtain(true,'Login exitoso.',$userLogged));
                    $response->withStatus(200);
                }
            }
        } catch (\Throwable $th) {
            $response->getBody()->write(GenericResponse::obtain(false,$th->getMessage(),$th));
            $response->withStatus(500);
        }
        return $response;
    }

    //Funcion que registra a un usuario por primera vez
     //Crea Usuarios
     public function crearUsuario(Request $request,Response $response){
        try {
            $email = isset($request->getParsedBody()['email']) ? strtolower($request->getParsedBody()['email']) : '';            
            $pass = $request->getParsedBody()['pass'] ?? '';
            
            if(empty($email)){
                $response->getBody()->write(GenericResponse::obtain(false,'No se envió un mail.'));
                $response->withStatus(400);
            }
            else if(empty($pass)){
                $response->getBody()->write(GenericResponse::obtain(false,'No se envió una clave.'));
                $response->withStatus(400);
            }else if(Usuario::where('email',$email)->exists()){
                $response->getBody()->write(GenericResponse::obtain(false,'Ya existe un usuario registrado con ese mail.',$email));
                $response->withStatus(400);
            }else{
                $hashPass = PassManager::Hash($pass);

                //Por default el usuario va a ser cliente
                $newUser = Usuario::create([
                    'email' => $email,
                    'clave' => $hashPass,
                    'id_rol' => 2
                ]);
                $token = Token::getToken($newUser->email,$newUser->id_rol);
                $newUser->token = $token;
                $response->getBody()->write(GenericResponse::obtain(true,'Se creó correctamente el usuario.',$newUser));
                $response->withStatus(200);
            }

        } catch (\Throwable $th) {
            $response->getBody()->write(GenericResponse::obtain(false,$th->getMessage()));
            $response->withStatus(500);
        }
        return $response;
    }
}