package br.net.lavanderia.crud.model;

import java.util.List;

public class Pedido {
    private int id;
    private double valor;
    private int prazo;
    private List<ItemPedido> roupas;
    private String hora;
    private String status;
    private String data;
    private int clienteId;

    // Construtor padrão
    public Pedido() {}

    // Construtor com parâmetros
    public Pedido(int id, double valor, int prazo, List<ItemPedido> roupas, String hora, String status, String data, int clienteId) {
        this.id = id;
        this.valor = valor;
        this.prazo = prazo;
        this.roupas = roupas;
        this.hora = hora;
        this.status = status;
        this.data = data;
        this.clienteId = clienteId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public int getPrazo() {
        return prazo;
    }

    public void setPrazo(int prazo) {
        this.prazo = prazo;
    }

    public List<ItemPedido> getRoupas() {
        return roupas;
    }

    public void setRoupas(List<ItemPedido> roupas) {
        this.roupas = roupas;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public int getClienteId() {
        return clienteId;
    }

    public void setClienteId(int clienteId) {
        this.clienteId = clienteId;
    }
}
