package br.net.lavanderia.crud.model;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "roupa")
public class Roupa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer IdRoupa;
    private String descricao;
    private Double precoRoupa;
    @Column(unique = true)
    private String tipo;
    private int tempo;
    @OneToMany(mappedBy = "roupa")
    private List<ItemPedido> pedidos;

    public Roupa() {
    }

    public Roupa(String tipo, int tempo, String descricao, Double precoRoupa) {
        this.tipo = tipo;
        this.tempo = tempo;
        this.descricao = descricao;
        this.precoRoupa = precoRoupa;
    }

    public String getTipo() {
        return this.tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public int getTempo() {
        return this.tempo;
    }

    public void setTempo(int tempo) {
        this.tempo = tempo;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setPrecoRoupa(Double preco) {
        this.precoRoupa = preco;
    }

    public Double getPrecoRoupa() {
        return this.precoRoupa;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public Integer getId() {
        return this.IdRoupa;
    }

    public void setId(Integer id) {
        this.IdRoupa = id;
    }
}
