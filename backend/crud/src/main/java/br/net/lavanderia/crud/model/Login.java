package br.net.lavanderia.crud.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;

import jakarta.persistence.OneToOne;

@Entity
@Table(name = "login")
public class Login {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer IdLogin;
    @NotBlank
    private String login;
    @NotBlank
    private String senha;
    private String token;

    @OneToOne(mappedBy = "login", fetch = FetchType.LAZY)
    private Cliente cliente;
    @OneToOne(mappedBy = "login", fetch = FetchType.LAZY)
    private Funcionario funcionario;

    public Login() {
    }

    public Login(String login, String senha) {
        this.login = login;
        this.senha = senha;
    }

    public String getLogin() {
        return this.login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return this.senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Cliente getCliente() {
        return this.cliente;
    }

    public Funcionario getFuncionario() {
        return this.funcionario;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
