<template>
  <div class="ajax-loader">
    <div class="ajax-loader-animation">
      <div><div></div></div>
      <div><div></div></div>
      <div><div></div></div>
      <div><div></div></div>
      <div><div></div></div>
    </div>
  </div>
</template>

<style lang="scss">
@mixin ajax-loader($ball-size){
	$duration: 3; // seconds
	$ballQty: 5;
	
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	width: 100%;
	height: 100%;

	.ajax-loader-animation{
		position: relative;
		width: $ball-size*$ballQty;
		height: $ball-size;

		> div{
			position: absolute;
			width: 100%;
			height: 100%;
			animation: snakeAnimate #{$duration}s linear infinite;
			overflow: visible;

			> div{
				position: absolute;
				top: calc(50% - 10px);
				left: calc(0% - 10px);
				width: $ball-size;
				height: $ball-size;
				background: #2b9db1;
				border-radius: 50%;
				transform-origin: 50% 50%;
				animation: squashAnimate #{$duration}s linear infinite;
			}

			@for $i from 1 through $ballQty{
                &:nth-child(#{$i}){
                    animation-delay:#{($i * ($duration / $ballQty*-1) )}s;

                    > div{
                   	 animation-delay:#{($i * ($duration / $ballQty*-1) )}s;
                    }
                }
            }
		}
	}
}
.ajax-loader{
	@include ajax-loader(20px);
}

@keyframes snakeAnimate {
	0%{
		transform: translate3d(100%, 0, 0);
	}
	80%{
		transform: translate3d(0, 0, 0);
	}
	85%{
		transform: translate3d(0, -100%, 0);
	}
	90%{
		transform: translate3d(100%, -100%, 0);
	}
	100%{
		transform: translate3d(100%, 0, 0);
	}
}
@keyframes squashAnimate {
	85%{
		transform: scale(1, 1);
	}
	90%{
		transform: scale(2, 0.5);
	}
	92%{
		transform: scale(0.5, 1.5);
	}
	95%{
		transform: scale(1, 1);
	}
	100%{
		transform: scale(1, 1);
	}
}
</style>
