<div class="panel panel-default">
	<div class="panel-heading">
		<strong>Scrum Updates</strong>
	</div>
	<div class="panel-body">
			<textarea class="form-control" ng-model="newcomment" placeholder="Add your update here" cols="10" rows="5">
			</textarea>
			<button ng-click="addScrumUpdate()" class="btn btn-primary">
				Add
			</button>
		<div class="media" ng-repeat="update in resource.scrum">
			<img class="media-object photo-small pull-left" src="/static/img/foouser.jpg">
				<div class="media-body"> 
					<div class="media-heading"> 
						{{update.Update}} 
					</div>
					<p>{{update.User}}</p>
				</div>
		</div>		
	</div>
</div>