
// ------------------------------------------------------- ProjectDockWidget

ProjectDockWidget=function( materialEdit )
{
    VG.UI.Widget.call( this );

    this.materialListWidget = new NodeMaterialListWidget( { dc : VG.context.dc, startRender : startRender, materialEdit : materialEdit } );

    this.controller = this.materialListWidget.controller;
    VG.context.controller=this.controller;
    this.controller.undoObjectName="Graph";

    this.controller.addObserver( "selectionChanged", function() {

    }.bind( this ) );

    this.controller.addObserver( "changed", function() {
    }.bind( this ) );

/*
    var addButton=VG.UI.ToolBarButton( "Add" );
    addButton.clicked=function() {
        this.addGraph();
    }.bind( this );
    this.listWidget.addToolWidget( addButton );

    var saveButton=VG.UI.ToolBarButton( "Save" );
    saveButton.clicked=function() {
        var selected=this.controller.selected;
        var savedGraph=VG.Utils.compressToBase64( JSON.stringify( selected.graph ) );
        console.log( savedGraph );
    }.bind( this );
    this.listWidget.addToolWidget( saveButton );
*/

    // ---

    var projectLayout=VG.UI.Layout( this.materialListWidget );
    projectLayout.margin.clear();
    projectLayout.vertical=true;
    projectLayout.spacing=0;

    this.stackedLayout=VG.UI.StackedLayout( VG.context.editor.containerLayout );

    // ---

    this.layout=VG.UI.SplitLayout( projectLayout, 40, this.stackedLayout, 60 );
    this.layout.vertical=true;
    this.layout.margin.clear();

    this.minimumSize.width = 280;

    this.init();
};

ProjectDockWidget.prototype=VG.UI.Widget();

ProjectDockWidget.prototype.init=function( canvas )
{
    // this.addGraph();
/*
    let grass={ text : "Grass", graph : { nodes : [] } };
    grass.data = "N4Igdg9gJgpgziAXAbVASykgDAGhAYwBsBDOOAOWIFsYkRzoYBZYgFxgCc1jCQ8xqtRCBbsuPPiBqsehNPmx44VCBFYALMPASJcIDjABmhGPhlh8QgIx4AHgAUIOgEwBOPAE9HLgKwA2PHwIMC0zNGCdVBAxKjQBQkoaOiDCCA5JIJCGWABJTERnQOCwABVOWPjEoQIIVPSAXxxQGLieKrpIDioJIqzGPKR3GpCyrtaEwToAN1MAZhBG5vLx9uFO7t5esGyYAcQA4dLlysm1tI2FpujjttP9IxMzYgtaLZ29g8yjsZOk4VYAK4cABGAJML0uSx+tz+IGUqg0WjIGWK73yn2KowqMOqgJBYJgEPqAF0inUkKB0ro8ABzRQgYH04hIKyNOEAB1MYOIVMpLNp/IZguZiFZ/HOPAA6jA0DT1KxsAA6AAsWGVAA4AOzqtVanUa7WzRYgDCCoikCh3HYAcQ4xCgaEJrFmABFJAJYbb7Y6wKwAAQMNBwV4gBxOJB+PxDLzh0WzZVbUyscJgSJQ7ETWGGAEWZPBFF9XLorZYlZ3SBB2gk42mgqBEhkVb0RhMNC2ADCtTS7rurdsfoAtH7O+SyWkrBT9ErnOrlZrXOrXD5XK5NX5/K4DnTdIqfFZZn4sH5lX5nGerGrCkLEAOrIqrBez7MsM4T849/4fDBbz48CKxTUdTOJOVJYIq6pnsqsyzK4ziau+J6zLOAo7v4M4+M+x46lgPhuEMjI7lYK5+EhWF+JqVivj46p/iybJhi4M6eN4SA+L+hxJimabXNCmbVCk3ZvP0+R6F8pa/PxXYNFcLQSXQsS2AW2zCUgmoljcfF0MYEBsJCPEZk2ClKWiEbqbxTZ4qC4KWAsxI1sWBANpasI7CUQJWYSNn8Hcbn4tZIZwPgPAwNaqTAhIiA+HoDFIFBNggDGOgwWpHFhBESBRLJOIdBAlbGSpopmQZdzZrmKZ6Vlmn/O5BIQkJRaqUVZawgAQhVGlNusPSHCZiBDGJHV3AAgu15nlhKmw9QVomYoNsJdbwxqVRZNX+flDXUoc4nZcIBjGEmzw2Utc24qtnkhl8vVXgNY2wkZx23adfnnetuwiU1cnCPCaiaNotnVkAA===";
    grass.graph=JSON.parse( VG.Utils.decompressFromBase64( grass.data ) );
    this.materialListWidget.listWidget.addItem( CommunityListWidget.ItemType.Inbuilt, grass, true );

    let oldMetall={ text : "Old Metall", graph : { nodes : [] } };
    oldMetall.data = "N4Igdg9gJgpgziAXAbVASykgDAGhAYwBsBDOOAOWIFsYkRzoYBZYgFxgCc1jCQ8xqtRCBbsuPPgQiEIHJKDmIsAOgBsARgCsAFgDsWLJoDMADiO6AnACZNqvAHNsarXoPGzlm3ZAAjJxp19Q1Nza1s8YiR1AF88OAAHGHwAVxJFBSiHTN9syMQYvBpWHkI0fGy4KggIVgALMHgEJWUTdW1NdQ0rCywjKxsTPA4YADNCJOKwfCF1PAAPAAUIJtVNPABPJabu73wIMAb8VjR9ptQQMSo0AUJKGjo9mTk8PYOGWABJTEQjF/2wAAqnCuNzuQikTxAsVAl2uPDBdGGYwmxCmtD+b0YXyQ2gxgOBcNugjoYwgbChOBhBNBxOElWqdQaZEkrzA7xg2MQuKkByBHBB8NpIFJ5OiAF1oSAMNkiKQKEL2QBxDjEKBoGBgVhGAAikgE92EytV6s1AAIGGg4OiQItlkgTNpZiBNnbEDZuayJicwGcqfzCQjhCNklNjvsWf92ZyrHi+QKiQbwBBLbRxZLpW6XiQyIH6IwAckOD5UhrpnqhQWiyW0ZI4PgeDBFTIfBJmposN0rNpVCYNNZuyZdPMtkhVD2NiOuSZBjzDmGfUhzrCaYnICmI5jPt8nay4wGhcHQ96KX747nWIXi+Ma3io981rO9yvwQAhKESylS76/AjZ+WJ9kmDQOYAGFpFkctEyAuZTQAWlNMDIT+J51HkEBFBUIwsF0HQLAsdQO30dQrCMCxvEcZosJw7Q8IIqwiJIsi8D8SjsNw/DCKwYjSO8PICghWQrDQjDlF0dROgsdsLEHDte3MLJmjEiSpJkqw5KHHJFPE1RJKwaT9DU1R5JAPjYhtScrA0CdXUkvEvVORdT33RNHgg28sW+XBH2pQUXPAuRJWXXzwSuOYNzZDykAfXcfITcERVYd902+D0/1zdkAHkGiAsBkgQfghSymBTRyvLJGIHwmhGHgrT+KgaE1OhJFtbZdBnF0mg6Cw7KOb1fQuWLcwS8K72wWNBqFJFxiOVEy0CibEwAQRGyLEGi/4n2CkkZFFT8gri7ayUS9ytzG7z/WfOh6RqepGiSz8M2itKFUYRauDqIoyny8AhTetAPpgY58G+qpYCQGMpHqjVEuEZrJz0H8OvB+ievnfr9tzN8To5b4IZii6tuEC8q2vOa9oW8Fluxzldg2inDt2pzLqDHbjtnUauXGgmDuEZb5u5obWZW06fi5s8hVC+70G+XZnoAxgADEhYKxMlaO00ADUeGSa1hszczXR7B8kfyYzPV6hyUCZwnhWV9nVvW3l6d5pKJSAA==";
    oldMetall.graph=JSON.parse( VG.Utils.decompressFromBase64( oldMetall.data ) );
    this.materialListWidget.listWidget.addItem( CommunityListWidget.ItemType.Inbuilt, oldMetall, true );

    let marble={ text : "Marble", graph : { nodes : [] } };
    marble.data = "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";
    marble.graph=JSON.parse( VG.Utils.decompressFromBase64( marble.data ) );
    this.materialListWidget.listWidget.addItem( CommunityListWidget.ItemType.Inbuilt, marble, true );

    let pattern={ text : "Tiles", graph : { nodes : [] } };
    pattern.data = "N4Igdg9gJgpgziAXAbVASykgDAGhAYwBsBDOOAOWIFsYkRzoYBZYgFxgCc1jCQ8xqtRCBbsuPPgQiEIHJKDmJcIAObY8AI3UhiSAIwBfPHAAOMfAFcSihfrxrEezXZ36jIGqx6E0+bXCoICFYACzB4BCUAOgB2PQBmGKwATgA2GJiAFj1k+IBWTOS8DhgAM0JzLzB8ISdwWSoeAHUYNBUQ1mwo5Ly8fAgqGjBO4UkADwAFCEi9ZQBPKZm9ACY+iDBw/FY0dcjUEDEqNAFCSho6fpk5NY2GWABJTEdlfo2AFU4jk7OhEAA3czxEBGUCHY48H50DQWKgmSSvMB3GCPfSrKTvT7g06COjlCBsYEAXRBIAwLiIpAoOOESIAyiFiGY4MsACKSATnYT0xnwAAErMkcAZZn8aAAXkJQGMur0QHMZe4OBALGAnlgonU4PgeEJ1bKSmYCYgpfoNXh5Y4zSAxdh3JNpvosMsYubFkg8nUEZUdmA9qDMd9qSA8QSbojGCjEPEwx8OF8IUGjtKSWDA5zg2hCLww0jI5kYwGE+mAIJEvAMjhqqLRkBwVhKgDWtWKwTYQmSynrxF9JHY8hA0qU5ttxhCEAA7hMSn80DBx0h6xYYGtBjBhnQAEowQ3sKC8gBCEDG8EkxDGaEiWBJZKjfRIZEhNMYTDQYwAwtJZOygy+xryALS8h+Vzwp+HB6P2ijqss8QJDEywFB2OSpFgMQAByyg40GwYkCGFFgyGoRhzjRDBcF4UhaREbKuiOO4lyyMskFdMk2SZOkZE5HkywpEUqhdCkSTLM6aHpHkqGpHkiQkeqglOiJYkSVJLquHRo4TlOMAznOC4cEuK5DCMICHn+DHXAObqIKk8TzJZ8Rol6Ww+n6ByFti6ZJqBtwRk8nrrGAsbxu5vwhp0KZuY+UggTmPlIGhBZxlikWluFiVpr8nkxQ8TypAlQWRaFRLXk8Dn3lS6Z0sK8ACvwQbcky/JsqOPIuHA4qSgOMrDtEeSKsqqpdHUFZVssqSpKJywdvZCFoVgqSZCpdaNs2tbahUXUgEqXh9kOm3bjARomogyxRLKFonb1eD2jMWDxPFcqWcsolht6uxIPsqZFiFmbZui4bZUguV/YFSVBvuwI4P6aVfbiP1ef9yK+fdCIg+ldApYSeBdj2bb9oO6rwd1/7Qe4QoadOs7zogi7LlIq7rsIAASMB/vVtB4GeF4jugTz5gQZWRUixZcKEni+AgtUliLIRi/gEseIwSBomTk4Uzp1N6bT/T00ZTBWNsJiEHMvIhCzvLjmgoS8hoR7jJZqRPa6DrHeJL1OW9KBQ/lYPw7mTyyijEVBoVqXeyWvuxY4eWg+mpRw6HMchTIoZ/X7gPR2jwgpZDrnQ8FdBvhHAOODWgd55FkAXrQCeZ8GyedFliNxRnMPCODBjEjnN4BwLQZIgA8uEL5gBY8scr8g8wLyw+j4KY6q1plO6fpdOGXQdvO2hNlO5Ed1+Rsr2+u9XuJ7i9dF03iB82XYe/O3OeffnWcX5GKk36fwhx1mRVdzld6UoLRgwtLYyxgNsOW34pYgNlvLQIsB/Dz00tpKmNMDJriMsWKAe5TZ/iFC1K6llsh1AWM7GyyN/KHxco/ZKL9eYtyfnXfEYUH5B3TODRukYHL+VRq3DM38a68MKhwp4pduGsIyq+CGJ9a5CNTpHFY9CaEd2KkgN+vcKqMDZsyJq4A6pVTgI1OeLUo61nanjGUfELR6mSH1FUVYhrEErK1esEAmytTWrqU6LZtq6mKPtQ6nVjpeLlErU6dpLKzEyLZZ2hQgaOW2B7D64jYbf2Ee6RRQYMZYw4N2OAvYOr41iGiC0xMojLFJogtWKDNZoIZiAZmf4WBwAbKec8l4VGIGRuo34QtpYwMgb8YBoswHi0kHAoQytKmL3Vqg1e6CC4WFYCbM2pQlRUF5GZDekRMjLGIXZfemwElH09rnW+6NaFIFERicuQZNkCIYQCfAQI0nPAyeHe5kV2FyOLtfMRNzY7nw+UGQuLyeJvN+I8piyjf5ID4hSB8fdnyvmAl+SWvxfwASAmBUCVwILGk2l0MiuFEIESouhTChKcLwRJYRclMkylUooqSlCdLVKGDWFcJi+KoLdDQpNZ0o1Zp6DyGNeINYsJRAwmK6Vs1MhivEoUelCQpLCT5YUTIfLJqZBom4dSC9kHLy1gMNeTMzabIIaQsaO93RoV+Qfd2xykn/N+Oa75l9ZjgroPfaRvDMpusjHoch1yzmf0BZ3Hmjp/4Io0bAIZoDwFj0yX0kZEC8DjIQeTaZ1SV7axNSATB2CzXYotZEXZZ07JvwoQ6qhyTn4vKDQFWt/xARSNOR/ZtTyLm7XfrXO5LDnVeq7XCv5IaopfmhRGxwnpul0CRAAcRyVAWcwx4g6PHnQBdxAl3oN5AwKugoPFzpkBoCQ0QYiJDyHyhIKR0hoTvYtDx5iTEWjqDaNStYpkGo1jm418zRglsdPEPmJDIgxEvW7I5NaB2fxVA6rtORPXCErnAau/bR3IfZv6kqLwR3tqyToG2iy6AAB4OhUEIAAPmIyYCjm7t3DF5Ku3kGGoi8mI8QE2JRSgAF4AA6IAOisBMHARAAB6UT45JNRDwbADgrAIBzCiNrUTyDROZCgKUUoG5Gb8Yo/uUgMA9zrF5BxjDxHRPEAo9bY27HONlD4wJ1gQmRPick+OaTDJZPycU8p0enBRNoAAI66fuGANoEBeQAEULCZhgGKczlnWNbgqAZvcdjOC8lCFPJg9w3i8h8DUX0MAojmZo7xsAvJKtVcq9Rij/HIBxh4Px3kJRWAWA4L6TLpsTMnDmOA3ksm0B/DYENqeEBShdanioRdy6lmlFg0c1jABNZUGzuy8ggCYI53hjZwAsCYQ2xt1s8DEAIbYAITakBCLyeb1QjkmYMccEwiySuiZo+ZsjlHyvVd5K2m8Cj+YAMRbG5NCaBno1B6MtNisTEqyQUvb9RqdZ0AaRhzFeCRQAccITB6MS9AHMocfNttcQVYf0Fcxt0HGEEiBeHF5cTcMyMBWh9tXyERp0cA2nhDCQ4s6Z0wrtOHg3tuhLCH+k7A1RvKj0oBkPU26KgcMsH0P4HHT1fDmZNS5l1L1oQA2RtmMQCrj1wt0oseXr2c7cSQvDnOSJ9QzJXauHC5kfHPngjz4vOHS731kjadJwFy8gHPbeHeuJ6Hp3NvucFTDR0sFgPo0y5B9AlNibFfxqhwrVXyg4dVMNbUoytJAjBFNuEPcGGtlxTmtaxAcQbeE5OQ7thTuDnR+Dszn1PPPdk854h4yram+DPg63ptFf/d0EhV2rnTbC4TtJCVadQOY0wAAGLd/XcINfTDeQADUeBLkkIVaIfNrqOkmjX1iDP7WQft022R7PI7x5Dww9uxJiRAA==";
    pattern.graph=JSON.parse( VG.Utils.decompressFromBase64( pattern.data ) );
    this.materialListWidget.listWidget.addItem( CommunityListWidget.ItemType.Inbuilt, pattern, true );

    let brick={ text : "Brick", graph : { nodes : [] } };
    brick.data = "N4Igdg9gJgpgziAXAbVASykgDAGhAYwBsBDOOAOWIFsYkRzoYBZYgFxgCc1jCQ8xqtRCBbsuPPgQiEIHJKDmJcIAObY8AI3UhiSAIwBfPHAAOMfAFcSihfrxrEezXZ36jIGqx6E0+bXCoICFYACzB4BCUAOgAWAFY9ADY9ACYATiwAZhSUuIAOLESYmLwOGAAzQnMvMHwhJ3BZKh4AdRg0FRDWbCjErCwCooTk9KyUvHwIKhowbuFJAA8ABQhIvUy8AE8VteSJiDBw/FY0A8jUEDEqNAFCSho6SZk5fcOGWABJTERxqUOAFU411u9yEUmeICMoCuNx4oLoGgsVBMkkmb0YXyQJT+YEBHGBcMEdEqEDYkIAulCQBgXERSBQicJ3jAAMohYhmOApAAikgED2EbI58AABDzJHB2WZ/GgAF5CUALFybHpxdwcCAWMDfLBRBrsjg6vXpDLZXKDeJJYysDUAa3qeGICzQkWUcHwPCEuripWCbC9eBtxDAcBI7HkICVSi22HVMDMZMQiqQvxVjnckogAHclmUAG5oGBZpA2iwwfbTGCzOiLHZINKZBrbVb6PI+nHVU4hpAXGEgxkgcpoQi8V5gZmYxDYtG4oGwu4DgCCkJw0Ln/YFg+Ho5xE++aTHeIJC83y6pfcJm6HI9RB3HGO+eUP68vYIAQiu1/j5/DhNedzOe4ps+34bmC1xKgYlKrtS3y/HSZC/vQjBMGgCwAMLSLIfIDqhCwigAtCKmEQvszx6BGii6pkeTxCaMTJIkKRYAA7DEmQsfYPQ0XRaRpAxSTMWxHHONEPFxPRjFCexnGuOmZGyCklE9CkeSpH0LGZGkehJGkiSZEUXHRiAWjGbo8kgJmOb5oWxaIKW5ZSJW1bzHgywtj8ejYs2kTsWOnZnD2X7HkhTzYWOQHGTOR4/gOYVyOeL4nuBaG3uinzfA00VJUh/4UlSNJThMJCIQOzKLlwoSeL4CD8EulUhNV+C1R4jD+CE2a5jABZFiWHBlhWMxzCAtYeZkBlbHWPxsf5xxducwWxaeaX3hltJ3jFYHEtun6XDlA4fhFD5IE+OKba+xIyGSiWgRdf5Xd0R1rVFG37ZuiLIrtF7JXQ6ErZFOkgSFA4ktd0HoN87YIQym7lQ1TUtfyYIVWgVUwCczWSIEsDtZ1Nm9fZ/WOZMznDaNkR9KmU0JLJM4Bd2KCLVtwiHbux2IIkQNLWCoPdDdwNXg9/3s6d2W3T9whnjB31IcuT0wJOtOveLSGsBYHCIlUtS0FBBXfJzBAlTDYLMgAYkLdWbubpKsCKABqPBlpIvM9A07mRHkmTtj5SD6Urhz0wte0qyDFts89UPKwL775TBhW00bSHMv86ua1WdQ4ZuKca1Y6e0MYHpVAA4jIGgSI4xgddZ3W2X1A1OUNNZuVNane1NMT9LNJyBYzwfR3Qas51rGfy5OkcAm9yNfZPdCQC6+fhwrmXKGL/d/lqc0HBSjoaJqw0ADxdFQhAAHz7yYJ/Z2n2sirIIqm2+TBRPvAD0F8ADpgCK38/9/58nwAJRgAARwsGgMocARTEBFHPOAMARTlA3t3L+pARQ3BMBYVgUQRT/BCPA9+jR8Q8AIbfTBGDbZZm3LfMAhBNgig0PAvMPAMAiizHgr+oR4HoMwTAiA88RTskgdAghkAiGEBIXvchIpvrPzfmfF+R9T6f1/iKXahVRaJzKowFGaMMaI3qqjRq6MapYzaj8SueMa4EwcoNKsw03xIhMJA8od8NBcHwLaFq7skAcVOj7RAcRO4dk3gzXsM9JbCwjlzZmg4hb825pdG2kSl5YmiXdEAH54kxNZoBdmWUo4JL/DtXWcd9zFXpEnRgAB5cIqEwAWH0ZuGp8C6kNIlFXLqPU7I2IbnYpukZqaaUmmNK0wTkFBxlkuZJk58kTxDleYp0twmxKSaPTKszZzzKniUiG+gV6aNhowO2sgDh8MyLyS2YJjkajniKBg88JSFxgCXCAZdeA/CiHkPSEk0gsTiExPQbY9KnXdJ6CMUYmwuFlG4Cx1cul12JlMRurkdC70wXQQ+rBj5nwvtc05aARTnN4fPbB+9oEhDKOUAAvAQrorAnGIBfi/LMLKoiSmILADgrAICbCiCTF+XSX6ECgIQc54iQAnzfKQGAUBqFQOJXA1+xAT70LoWSgRlKaUgDpQyplLKsxsvZJy7lvL+UNM4C/NAwCCEnw+GADoEARQAEUwFVFlEqk+2CgFVGlbKrUnLpF4JFEwD4/wRQ+DqCGGAsiP5fxUX/D+jR556BIWUQeIZA3wKIKseAtsoAuhqHUaRjroF1BHDgEUIi+FwJSCQzhIo4FolldmuBcBbbBllSw+tLCIDlEzSKMthBsEAE1NQDuDLfEwyDvB0LgBYEwJhaFQJQYQMQAgTh5ngYIkICCkFdigZA7hWDX4XxFK/RRJ9lHkz2RNEA/iYh6APGM+aQU+6FMHHureaykD+02WvJNcDY67McFlA5JttHw2MZjS5dAdFGL0aYnG5jLIdPxt0omtiXIZMcc4u+KgNQQE3V4qaBk/FTRYlgDZgdX2TM3Dku8AN4IFJibAnWSytmwemWUs6yyXZZPSS7b9RUeMceEH9HZsF9DwTA3QZkRcOAcsLLMc5mcwTycU3Yu51aF6guLqXcueggm6YVJGZUUKYUocsfCwm9cSbIpGjvPeGKL3/3U/mzTRLWOkvJZq2lrB6VwEZcy1l7LjU8r5VMAVtkX4xCgOUcoACAASNqpVwNlQceVrGPWqrPT5ioWqdWBb1SFo1nATURaoC/c1HBLXWolXah1zrXUwHdS/ZVXqYA+rSyKf1nB+0hrDRGqscCY2XrjfG/+VaxGpvRurDN9bgw8E2BjEUnK0BMI3fA3t/b8MadmLu2oyCR1jo9F/CAU6uwzobfOxddCJ08DXWwdbW7SA7sQYd/dqCj2jfPVipR43v7Xo5ixA2/iWLpC7i+3utGwSsa4/oDZ50JYZPypSIAA==";
    brick.graph=JSON.parse( VG.Utils.decompressFromBase64( brick.data ) );
    // this.materialListWidget.listWidget.addItem( CommunityListWidget.ItemType.Inbuilt, brick, true );
*/
};

ProjectDockWidget.prototype.addGraph=function( canvas )
{
    var item={ text : "New Graph", graph : { nodes : [] } };

    this.controller.add( item, true );
    this.controller.selected=item;

    VG.context.editor.addNode( new VG.Nodes.NodeMaterial(), true );
};

ProjectDockWidget.prototype.paintWidget=function( canvas )
{
    this.layout.rect.copy( this.rect );
    this.layout.layout( canvas );
};