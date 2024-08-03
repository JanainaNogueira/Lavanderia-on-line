package br.net.lavanderia.crud.model;



import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "funcionario")
public class Funcionario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne()
    @JoinColumn(name = "fk_Login_IdLogin", referencedColumnName = "IdLogin")
    private Login login;

    @NotBlank
    private String nome;
    @NotBlank
    private String nascimento;

    public Funcionario() {
    }

    public Funcionario(String email, String nome, String nascimento, String senha, int id, Login login) {
        this.login = login;
        this.nome = nome;
        this.nascimento = nascimento;
        this.id = id;
    }

    public void setLogin(String email) {
        this.login.setLogin(email);
        ;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNascimento() {
        return this.nascimento;
    }

    public void setNascimento(String nascimento) {
        this.nascimento = nascimento;
    }

    public String getSenha() {
        return this.login.getSenha();
    }

    public String getLogin() {
        return this.login.getLogin();
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

    public void setLoginandSenha(Login login) {
        this.login = login;
    }
}