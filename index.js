Backendless.initApp("0B5B881C-AB5A-D7C5-FF52-297088A1FC00","9507AC93-13CF-F45F-FFA2-0DEF6F8E8F00");

$(document).on("pageshow","#todopage", onPageShow);
function onPageShow() {
	console.log("page shown");
    
	$("#taskList").empty();
	
	//run a query
	Backendless.Data.of( "Tasks" ).find().then( processResults).catch(error);
    
    $(document).on("click", "#addTaskButton", onAddTask);

} 

function onAddTask() {
		console.log("add task button clicked");
        var tasktext = $("#addTaskText").val();
        
        var newTask = {};
        newTask.Task = tasktext;
        Backendless.Data.of("Tasks").save(newTask).then(saved).catch(error);    
        onPageShow();
        document.getElementById("addTaskText").value="";
   
}

function saved(savedTask) { 
      console.log( "new Contact instance has been saved" + savedTask);

}


function  processResults(tasks) {
    //alert(tasks[1].Task)
    
    //add each tasks
    for (var i = 0; i < tasks.length; i++) { 
        $("#taskList").append("<li>"+tasks[i].Task+"</li>");
    }
    
    //refresh the listview
    $("#taskList").listview('refresh');


}

function error(err) {
    alert(err);
}

