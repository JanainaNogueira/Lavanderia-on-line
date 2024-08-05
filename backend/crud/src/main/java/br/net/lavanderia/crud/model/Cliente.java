package br.net.lavanderia.crud.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.*;
import jakarta.persistence.*;

@Entity
@Table(name = "cliente")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank
    private String nome;
    @NotBlank
    private String cpf;
    @NotBlank
    private String endereco;
    @NotBlank
    private String telefone;

    @OneToOne()
    @JoinColumn(name = "fk_Login_IdLogin", referencedColumnName = "IdLogin")
    private Login login;

    @OneToMany(mappedBy = "cliente")
    private List<Pedido> pedidos;
    @NotBlank
    private String status;

    public Cliente() {
        this.status = "Ativo";
    }

    public Cliente(int id, String nome, String email, String cpf, String endereco, String telefone,
            String senha,
            Login login) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
        this.telefone = telefone;
        this.login = login;
        this.status = "Ativo";
    }

    public void setEmail(String email) {
        this.login.setLogin(email);
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCPF() {
        return this.cpf;
    }

    public void setCPF(String cpf) {
        this.cpf = cpf;
    }

    public String getSenha() {
        return this.login.getSenha();
    }

    public void setSenha(String senha) {
        this.login.setSenha(senha);
        ;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEndereco() {
        return this.endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return this.telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getLogin() {
        return this.login.getLogin();
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return this.status;
    }

    public void setLoginandSenha(Login login) {
        this.login = login;
    }

    public List<Pedido> getPedidos() {
        return this.pedidos;
    }

}