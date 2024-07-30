package br.net.lavanderia.crud.rest;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import br.net.lavanderia.crud.model.Cliente;
import br.net.lavanderia.crud.model.Login;

import br.net.lavanderia.crud.respository.ClienteRepository;
import br.net.lavanderia.crud.respository.LoginRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
public class ClienteREST {

    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private LoginRepository loginRepository;

    @GetMapping("/Cliente")
    public List<Cliente> obterTodosClientes() {
        return clienteRepository.findAll();
    }

    @GetMapping("/Cliente/email/{email}")
    public ResponseEntity<Cliente> obterClientePorEmail(@PathVariable("email") String email) {
        Login l = loginRepository.findBylogin(email).orElse(null);
        if (l != null) {
            Cliente c = l.getCliente();
            if (c == null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            else
                return ResponseEntity.ok(c);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/Cliente/{id}")
    public ResponseEntity<Cliente> obterClientePorId(
            @PathVariable("id") int id) {
        Cliente c = clienteRepository.findById(id).orElse(null);
        if (c == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .build();
        else
            return ResponseEntity.ok(c);
    }

    @PostMapping("/Cliente")
    public ResponseEntity<Cliente> inserir(@RequestBody Cliente cliente) {
        Login l = loginRepository.findBylogin(cliente.getLogin()).orElse(null);
        if (l != null) {
            Cliente c = l.getCliente();
            if (c != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            clienteRepository.save(cliente);
            return ResponseEntity.status(HttpStatus.CREATED).body(cliente);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PutMapping("/Cliente/{id}")
    public ResponseEntity<Cliente> alterar(
            @PathVariable("id") int id,
            @RequestBody Cliente cliente) {
        Cliente c = clienteRepository.findById(id).orElse(null);
        if (c != null) {
            c.setId(cliente.getId());
            c.setNome(cliente.getNome());
            c.setEmail(cliente.getLogin());
            c.setCPF(cliente.getCPF());
            c.setEndereço(cliente.getEndereço());
            c.setTelefone(cliente.getTelefone());
            c.setSenha(cliente.getSenha());
            clienteRepository.save(c);
            return ResponseEntity.ok(c);
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .build();
    }

    @DeleteMapping("/Cliente/{id}")
    public ResponseEntity<Cliente> remover(@PathVariable("id") int id) {
        Cliente Cliente = clienteRepository.findById(id).orElse(null);
        if (Cliente != null) {
            clienteRepository.delete(Cliente);
            return ResponseEntity.ok(Cliente);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .build();
        }
    }

}
