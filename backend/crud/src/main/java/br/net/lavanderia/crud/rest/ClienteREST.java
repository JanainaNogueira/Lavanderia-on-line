package br.net.lavanderia.crud.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Comparator;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import br.net.lavanderia.crud.model.Cliente;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
public class ClienteREST {
    public static List<Cliente> listaClientes = new ArrayList<>();

    @GetMapping("/Cliente")
    public List<Cliente> obterTodosClientes() {
        return listaClientes;
    }

    @GetMapping("/Cliente/{id}")
    public ResponseEntity<Cliente> obterClientePorId(
            @PathVariable("id") int id) {
        Cliente c = listaClientes.stream().filter(
                cli -> cli.getId() == id).findAny().orElse(null);
        if (c == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .build();
        else
            return ResponseEntity.ok(c);
    }

    @PostMapping("/Cliente")
    public ResponseEntity<Cliente> inserir(@RequestBody Cliente cliente) {
        Cliente c = listaClientes.stream().filter(
                cli -> cli.getEmail().equals(cliente.getEmail()))
                .findAny().orElse(null);
        if (c != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        c = listaClientes.stream().max(Comparator.comparing(Cliente::getId))
                .orElse(null);
        if (c == null)
            cliente.setId(1);
        else
            cliente.setId(c.getId() + 1);
        listaClientes.add(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(cliente);
    }

    @PutMapping("/Cliente/{id}")
    public ResponseEntity<Cliente> alterar(
            @PathVariable("id") int id,
            @RequestBody Cliente cliente) {
        Cliente c = listaClientes.stream().filter(
                cli -> cli.getId() == id).findAny().orElse(null);
        if (c != null) {
            c.setId(cliente.getId());
            c.setNome(cliente.getNome());
            c.setEmail(cliente.getEmail());
            c.setCPF(cliente.getCPF());
            c.setEndereço(cliente.getEndereço());
            c.setTelefone(cliente.getTelefone());
            c.setSenha(cliente.getSenha());
            return ResponseEntity.ok(c);
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .build();
    }

    @DeleteMapping("/Cliente/{id}")
    public ResponseEntity<Cliente> remover(@PathVariable("id") int id) {
        Cliente Cliente = listaClientes.stream().filter(
                cli -> cli.getId() == id).findAny().orElse(null);
        if (Cliente != null) {
            listaClientes.removeIf(u -> u.getId() == id);
            return ResponseEntity.ok(Cliente);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .build();
        }
    }

    static {
        listaClientes.add(
                new Cliente(1, "Jose", "jose@email.com", "098654723454", "Rua X Nº Y, Bairro, Cidade",
                        "(041) 000000000", "0000"));
    }
}
