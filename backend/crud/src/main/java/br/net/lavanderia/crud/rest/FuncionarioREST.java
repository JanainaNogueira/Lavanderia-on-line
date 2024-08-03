package br.net.lavanderia.crud.rest;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import br.net.lavanderia.crud.model.Funcionario;
import br.net.lavanderia.crud.model.HashFunc;
import br.net.lavanderia.crud.model.Login;
import br.net.lavanderia.crud.respository.FuncionarioRepository;
import br.net.lavanderia.crud.respository.LoginRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
public class FuncionarioREST {
    @Autowired
    private FuncionarioRepository funcionarioRepository;
    @Autowired
    private LoginRepository loginRepository;

    @GetMapping("/Funcionario")
    public List<Funcionario> obterTodosFuncionarios() {
        return funcionarioRepository.findAll();
    }

    @Value("${passwordSalt}")
    private String salt;

    @GetMapping("/Funcionario/{id}")
    public ResponseEntity<Funcionario> obterFuncionarioPorId(
            @PathVariable("id") int id) {
        Funcionario u = funcionarioRepository.findById(id).orElse(null);
        if (u == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .build();
        else
            return ResponseEntity.ok(u);
    }

    @GetMapping("/Funcionario/email/{email}")
    public ResponseEntity<Funcionario> obterFuncionarioPorEmail(@PathVariable("email") String email) {
        Login l = loginRepository.findBylogin(email).orElse(null);
        if (l == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Funcionario f = l.getFuncionario();
        if (f == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        else
            return ResponseEntity.ok(f);
    }

    @PostMapping("/Funcionario")
    public ResponseEntity<Funcionario> inserir(@RequestBody Funcionario funcionario) {
        Login l = loginRepository.findBylogin(funcionario.getEmail()).orElse(null);
        if (l != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        String hashSenha = HashFunc.generateSHA256(funcionario.getSenha() + salt);

        Funcionario newFuncionario = new Funcionario();
        Login newLog = new Login(funcionario.getEmail(), hashSenha);
        newFuncionario.setLogin(newLog);
        newFuncionario.setNome(funcionario.getNome());
        newFuncionario.setNascimento(funcionario.getNascimento());
        loginRepository.save(newLog);
        Funcionario f = funcionarioRepository.save(newFuncionario);
        return ResponseEntity.status(HttpStatus.CREATED).body(f);
    }

    @PutMapping("/Funcionario/{id}")
    public ResponseEntity<Funcionario> alterar(
            @PathVariable("id") int id,
            @RequestBody Funcionario funcionario) {
        Funcionario Func = funcionarioRepository.findById(id).orElse(null);
        Login l = loginRepository.findBylogin(funcionario.getEmail()).orElse(null);
        if (Func != null && l != null) {
            Func.setNome(funcionario.getNome());
            Func.setNascimento(funcionario.getNascimento());
            l.setLogin(funcionario.getEmail());
            l.setSenha(funcionario.getSenha());
            loginRepository.save(l);
            Funcionario uFunc = funcionarioRepository.save(Func);
            return ResponseEntity.ok(uFunc);
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .build();
    }

    @DeleteMapping("/Funcionario/{id}")
    public ResponseEntity<Funcionario> remover(
            @PathVariable("id") int id) {
        Funcionario funcionario = funcionarioRepository.findById(id).orElse(null);
        if (funcionario != null) {
            Login login = loginRepository.findBylogin(funcionario.getEmail()).orElse(null);
            funcionarioRepository.delete(funcionario);
            loginRepository.delete(login);
            return ResponseEntity.ok(funcionario);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .build();
        }
    }

}
