$(function() {
    window.modalLoading = function() {
        if($(".modal").length = 0) {
            console.log("页面中没有找到样式为modal的元素");
            return
        }
        var n = $(".modal:first");
        return n.find(".modal-title").text("loading..."), n.find(".modal-body").html("").append($("<div>").addClass("loading").html("正在努力加载中...")), n.find(".modal-footer").hide(), n.modal({
            backdrop: "static",
            keyboard: !1
        }), !0
    };
    window.onFailure = function(n, t, i) {
        var r = function(n) {
            var t = n.indexOf("<title>") + 7,
                i = n.indexOf("<\/title>");
            return n.substring(t, i)
        };
        alert("[" + t + "]" + i + "：\n\n" + r(n.responseText))
    };
    window.delCallback = function(n) {
        closeModal();
        n && n.result && n.dataid ? $('[data-id="' + n.dataid + '"]').fadeOut("slow", function() {
            $(this).remove()
        }) : n.message && alert(n.message)
    };
    window.delSelectedCallback = function(n) {
        if(n && n.result && n.dataid) {
            closeModal();
            for(var t = 0; t < n.dataid.length; t++) $('[data-id="' + n.dataid[t] + '"]').fadeOut("slow", function() {
                $(this).remove()
            })
        } else n.message && alert(n.message)
    };
    window.onSuccess = function(json) {
        if(!json.result) {
            json.message && modalAlert(json);
            return
        }
        if(json.callback) {
            eval(json.callback + "(json);");
            return
        }
        if(json.modalresult) {
            modalForm(json.modalresult);
            return
        }
        if(json.returnurl) {
            location.href = json.returnurl;
            return
        }
        location.reload()
    };
    window.modalForm = function(n) {
        var t, i;
        if($(".modal").length = 0) {
            console.log("页面中没有找到样式为modal的元素");
            alert("页面中没有找到样式为modal的元素");
            return
        }
        t = $(".modal:first");
        t.find(".modal-body").html(n);
        t.find(".modalTitle").length && t.find(".modal-title").html(t.find(".modalTitle").html());
        i = t.find(".modal-body form");
        i.length && (i.removeData("validator"), i.removeData("unobtrusiveValidation"), $.validator.unobtrusive.parse(i));
        t.find(".modal-footer").hide();
        t.modal({
            backdrop: "static",
            keyboard: !1
        })
    };
    window.modalAlert = function(n) {
        if($(".modal").length = 0) {
            console.log("页面中没有找到样式为modal的元素");
            alert("页面中没有找到样式为modal的元素");
            return
        }
        var t = $(".modal:first");
        if(t.hasClass("in")) {
            alert(n.message);
            return
        }
        t.find(".modal-header").show().find(".modal-title").text("系统提示：");
        t.find(".modal-body").html("<p>" + n.message + "<\/p>");
        t.find(".modal-footer").show().find(".btn-primary").hide();
        t.modal({
            backdrop: "static",
            keyboard: !1
        })
    };
    window.closeModal = function() {
        $(".modal").modal("hide")
    };
    $(".modal").on("hidden.bs.modal", function() {
        $(this).find(".modal-dialog").removeClass("modal-lg").removeClass("modal-sm")
    })
})/**
 * Created by Administrator on 2018/3/19.
 */
