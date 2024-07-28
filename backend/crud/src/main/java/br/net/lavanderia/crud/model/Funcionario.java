package br.net.lavanderia.crud.model;

public class Funcionario {
    private String email;
    private String nome;
    private String nascimento;
    private String senha;
    private int id;


public Funcionario () {}
public Funcionario (String email, String nome, String nascimento, String senha, int id) {
    this.email = email;
    this.nome = nome;
    this.nascimento = nascimento;
    this.senha = senha;
    this.id = id;
}

public String getEmail(){
    return this.email;
}

public void setEmail( String email){
    this.email = email;
}

public String getNome(){
    return this.nome;
}

public void setNome( String nome){
    this.nome = nome;
}

public String getNascimento(){
    return this.nascimento;
}

public void setNascimento( String nascimento){
    this.nascimento = nascimento;
}

public String getSenha(){
    return this.senha;
}

public void setSenha( String senha){
    this.senha = senha;
}

public int getId(){
    return this.id;
}

public void setId(int id){
    this.id = id;
}

}