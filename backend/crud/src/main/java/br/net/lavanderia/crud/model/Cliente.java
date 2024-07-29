package br.net.lavanderia.crud.model;

import jakarta.persistence.*;;

@Entity
@Table(name = "cliente")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nome;
    private String cpf;
    private String endereço;
    private String telefone;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_Login_IdLogin", referencedColumnName = "IdLogin")
    private Login login;

    public Cliente() {
    }

    public Cliente(int id, String nome, String email, String cpf, String endereço, String telefone, String senha,
            Login login) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.endereço = endereço;
        this.telefone = telefone;
        this.login = login;
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

    public String getEndereço() {
        return this.endereço;
    }

    public void setEndereço(String endereço) {
        this.endereço = endereço;
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
}