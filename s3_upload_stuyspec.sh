sudo gulp build
aws s3 cp dist/prod/build.js s3://stuyspec
aws cloudfront create-invalidation --distribution-id $STUYSPEC_CLOUDFRONT_DISTRIBUTION_ID --paths /build.js |
	jq -r '.Invalidation.Id' |
	aws cloudfront invalidation-completed --distribution-id $STUYSPEC_CLOUDFRONT_DISTRIBUTION_ID -id read -r
