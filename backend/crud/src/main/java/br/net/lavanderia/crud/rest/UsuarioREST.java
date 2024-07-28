package br.net.lavanderia.crud.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class UsuarioREST {
    public static List <Usuario> lista = new ArrayList<>();

    static {
        lista.add(
            new Usuario (1, "funcionario", "func", "FUNC")
        );
        lista.add(
            new Usuario (2, "cliente", "cli", "CLI")
        );
    }
}
