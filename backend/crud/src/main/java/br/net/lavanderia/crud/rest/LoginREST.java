package br.net.lavanderia.crud.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.net.lavanderia.crud.model.Cliente;
import br.net.lavanderia.crud.model.Funcionario;
import br.net.lavanderia.crud.model.HashFunc;
import br.net.lavanderia.crud.model.Login;

@CrossOrigin
@RestController
public class LoginREST {

    @Autowired
    private ClienteREST clienteREST;

    @Autowired
    private FuncionarioREST funcionarioREST;

    @Value("${passwordSalt}")
    private String salt;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login login) {
        ResponseEntity<Cliente> clienteResponse = clienteREST.obterClientePorEmail(login.getLogin());
        if (clienteResponse.getStatusCode() == HttpStatus.OK) {
            Cliente cliente = clienteResponse.getBody();
            if (cliente != null && !cliente.getStatus().equals("Desativado")) {
                String hashSenha = HashFunc.generateSHA256(login.getSenha() + salt);
                if (cliente.getSenha().equals(hashSenha)) {
                    cliente.setEmail("forbidden");
                    cliente.setSenha("forbidden");

                    return ResponseEntity.ok(cliente);
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }

        ResponseEntity<Funcionario> funcionarioResponse = funcionarioREST.obterFuncionarioPorEmail(login.getLogin());

        if (funcionarioResponse.getStatusCode() == HttpStatus.OK) {
            Funcionario funcionario = funcionarioResponse.getBody();
            String hashSenha = HashFunc.generateSHA256(login.getSenha() + salt);
            if (funcionario != null && funcionario.getSenha().equals(hashSenha)) {
                funcionario.setEmail("forbidden");
                funcionario.setSenha("forbidden");
                return ResponseEntity.ok(funcionario);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
