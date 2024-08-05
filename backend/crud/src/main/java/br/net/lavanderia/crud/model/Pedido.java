package br.net.lavanderia.crud.model;

import java.util.List;
import jakarta.validation.constraints.*;

import jakarta.persistence.*;

@Entity
@Table(name = "pedido")
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Positive
    private double valor;
    @Positive
    private int prazo;

    @OneToMany(mappedBy = "pedido")
    private List<ItemPedido> roupas;
    @NotBlank
    private String hora;
    @NotBlank
    private String status;
    @NotBlank
    private String data;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "clienteId")
    private Cliente cliente;

    // Construtor padrão
    public Pedido() {
    }

    // Construtor com parâmetros
    public Pedido(int id, double valor, int prazo, List<ItemPedido> roupas, String hora, String status, String data,
            Cliente c) {
        this.id = id;
        this.valor = valor;
        this.prazo = prazo;
        this.roupas = roupas;
        this.hora = hora;
        this.status = status;
        this.data = data;
        this.cliente = c;
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
        return this.cliente.getId();
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

}
