package br.net.lavanderia.crud.model;

import jakarta.persistence.*;

@Entity
@Table(name = "itemPedido")
public class ItemPedido {
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "roupaId")
    private Roupa roupa;
    private int quantidade;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pedidoId")
    private Pedido pedido;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemPedidoId;

    public ItemPedido() {
    }

    // Construtor com parâmetros
    public ItemPedido(Roupa roupa, int quantidade) {
        this.roupa = roupa;
        this.quantidade = quantidade;
    }

    public Roupa getRoupa() {
        return roupa;
    }

    public void setRoupa(Roupa roupa) {
        this.roupa = roupa;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
}
