package br.net.lavanderia.crud.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import br.net.lavanderia.crud.model.Funcionario;
import br.net.lavanderia.crud.model.Cliente;

import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin
@RestController
public class UsuarioREST {
    public static List <Funcionario> listaFuncionarios = new ArrayList<>();
    public static List <Cliente> listaClientes = new ArrayList<>();

    @GetMapping("/Funcionario")
    public  List<Funcionario> obterTodosFuncionarios() {
        return listaFuncionarios;
    }

    @GetMapping("/Cliente")
    public  List<Cliente> obterTodosClientes() {
        return listaClientes;
    }
    

    static {
        listaFuncionarios.add(
            new Funcionario ("admin.lol@email.com", "Admin", "01/01/2001","1234", 99)
        );
        listaClientes.add(
            new Cliente (1, "Jose", "jose@email.com", "098654723454", "Rua X Nº Y, Bairro, Cidade","(041) 000000000", "0000" )
        );
    }
}
