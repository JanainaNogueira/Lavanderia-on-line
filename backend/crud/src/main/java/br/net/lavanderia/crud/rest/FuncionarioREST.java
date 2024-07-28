package br.net.lavanderia.crud.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Comparator;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import br.net.lavanderia.crud.model.Funcionario;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
public class FuncionarioREST {
    public static List <Funcionario> listaFuncionarios = new ArrayList<>();

    @GetMapping("/Funcionario")
    public  List<Funcionario> obterTodosFuncionarios() {
        return listaFuncionarios;
    }

    @GetMapping("/Funcionario/{id}")
    public ResponseEntity<Funcionario> obterFuncionarioPorId(
    @PathVariable("id") int id) {
    Funcionario u = listaFuncionarios.stream().filter(
    usu -> usu.getId() == id).findAny().orElse(null);
    if (u==null)
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
    .build();
    else
    return ResponseEntity.ok(u);
    }

    @PostMapping("/Funcionario")
    public ResponseEntity<Funcionario> inserir(@RequestBody Funcionario funcionario) {
    Funcionario u = listaFuncionarios.stream().filter(
    usu -> usu.getEmail().equals(funcionario.getEmail()))
    .findAny().orElse(null);
    if (u != null) {
    return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
    u = listaFuncionarios.stream().max(Comparator.comparing(Funcionario::getId))
    .orElse(null);
    if (u == null)
    funcionario.setId(1);
    else
    funcionario.setId(u.getId() + 1);
    listaFuncionarios.add(funcionario);
    return ResponseEntity.status(HttpStatus.CREATED).body(funcionario);
    }

    @PutMapping("/Funcionario/{id}")
    public ResponseEntity<Funcionario> alterar(
    @PathVariable("id") int id,
    @RequestBody Funcionario funcionario) {
    Funcionario u = listaFuncionarios.stream().filter(
    usu -> usu.getId() == id).findAny().orElse(null);
    if (u != null) {
    u.setEmail(funcionario.getEmail());
    u.setNome(funcionario.getNome());
    u.setNascimento(funcionario.getNascimento());
    u.setSenha(funcionario.getSenha());
    u.setId(funcionario.getId());
    return ResponseEntity.ok(u);
    }
    else
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
    .build();
    }

    @DeleteMapping("/Funcionario/{id}")
    public ResponseEntity<Funcionario> remover(
    @PathVariable("id") int id) {
    Funcionario funcionario = listaFuncionarios.stream().filter(
    usu -> usu.getId() == id).findAny().orElse(null);
    if (funcionario != null){
    listaFuncionarios.removeIf(u -> u.getId() == id);
    return ResponseEntity.ok(funcionario);
    }
    else {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
    .build();
    }
    }
    

    static {
        listaFuncionarios.add(
            new Funcionario ("admin.lol@email.com", "Admin", "01/01/2001","1234", 99)
        );
    }

    
}
