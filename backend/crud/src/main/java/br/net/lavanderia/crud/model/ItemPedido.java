package br.net.lavanderia.crud.model;

public class ItemPedido {
    private Roupa roupa;
    private int quantidade;

    public ItemPedido() {}

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
