package br.net.lavanderia.crud.model;

public class Cliente {
    private int id;
    private String nome;
    private String email;
    private String cpf;
    private String endereço;
    private String telefone;
    private String senha;
   
   


public Cliente () {}
public Cliente (int id, String nome, String email, String cpf, String endereço, String telefone, String senha ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.endereço = endereço;
    this.telefone = telefone;
    this.senha = senha;

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

public String getCPF(){
    return this.cpf;
}

public void setCPF( String cpf){
    this.cpf = cpf;
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

public void setId( int id){
    this.id = id;
}

public String getEndereço(){
    return this.endereço;
}

public void setEndereço( String endereço){
    this.endereço = endereço;
}

public String getTelefone(){
    return this.telefone;
}

public void setTelefone( String telefone){
    this.telefone = telefone;
}

public String getLogin(){
    return this.email;
}

}