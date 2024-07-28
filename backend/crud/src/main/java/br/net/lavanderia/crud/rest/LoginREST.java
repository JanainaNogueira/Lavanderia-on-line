package br.net.lavanderia.crud.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.net.lavanderia.crud.model.Cliente;
import br.net.lavanderia.crud.model.Funcionario;
import br.net.lavanderia.crud.model.Login;

@CrossOrigin
@RestController
public class LoginREST {

    @Autowired
    private ClienteREST clienteREST;

    @Autowired
    private FuncionarioREST funcionarioREST;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login login) {
        ResponseEntity<Cliente> clienteResponse = clienteREST.obterClientePorEmail(login.getLogin());
        if (clienteResponse.getStatusCode() == HttpStatus.OK) {
            Cliente cliente = clienteResponse.getBody();
            if (cliente != null && cliente.getSenha().equals(login.getSenha())) {
                return ResponseEntity.ok(cliente);
            }
        }

        ResponseEntity<Funcionario> funcionarioResponse = funcionarioREST.obterFuncionarioPorEmail(login.getLogin());
        if (funcionarioResponse.getStatusCode() == HttpStatus.OK) {
            Funcionario funcionario = funcionarioResponse.getBody();
            if (funcionario != null && funcionario.getSenha().equals(login.getSenha())) {
                return ResponseEntity.ok(funcionario);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
